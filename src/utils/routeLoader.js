// src/utils/routeLoader.js
import fs from 'fs';
import path from 'path';
import os from 'os';
import { pathToFileURL } from 'url';
import { createRequire } from 'module';
import logger from './logger.js';

const requireCjs = createRequire(import.meta.url);
const TMP_ROOT = path.resolve(os.tmpdir());

// ---------------- helpers ----------------

function findRoutesFile(modulesDir, dirName) {
  const candidates = ['routes.mjs', 'routes.cjs', 'routes.js'];
  for (const f of candidates) {
    const p = path.join(modulesDir, dirName, f);
    if (fs.existsSync(p)) return p;
  }
  return null;
}

function normalizeBase(basePath = '') {
  const base = (basePath || '').trim();
  if (!base) return '';
  return '/' + base.replace(/^\/+|\/+$/g, '');
}

function buildMountPath(baseNorm, dirName) {
  const base = baseNorm || '/';
  return path.posix.join(base, dirName).replace(/\/+$/, '');
}

async function importEsm(filePath) {
  return import(pathToFileURL(filePath).href);
}

function requireCjsFile(filePath) {
  return requireCjs(filePath);
}

function looksLikeEsm(code) {
  return /\bimport\s+.+?\sfrom\s+['"][^'"]+['"]/.test(code) || /\bexport\s+/.test(code);
}

function transpileEsmToCjs(code) {
  let out = code;
  // import default
  out = out.replace(
    /import\s+([A-Za-z0-9_$]+)\s+from\s+['"]([^'"]+)['"]\s*;?/g,
    'const $1 = require("$2");'
  );
  // import named
  out = out.replace(
    /import\s+\{\s*([^}]+)\s*\}\s+from\s+['"]([^'"]+)['"]\s*;?/g,
    'const { $1 } = require("$2");'
  );
  // export default
  out = out.replace(/export\s+default\s+/g, 'module.exports = ');
  // export { A, B }
  out = out.replace(/export\s+\{\s*([^}]+)\s*\}\s*;?/g, 'module.exports = { $1 };');
  // export const/let/var X = ...
  out = out.replace(/export\s+(const|let|var)\s+([A-Za-z0-9_$]+)\s*=/g, ' $1 $2 =');
  return out;
}

function loadFromTempAsTranspiledCjs(routesPath) {
  const ext = path.extname(routesPath);
  const code = fs.readFileSync(routesPath, 'utf8');
  const dir = path.dirname(routesPath);
  const base = path.basename(routesPath, ext);
  const tempCjs = path.join(dir, `${base}.temp.${process.pid}.${Date.now()}.cjs`);
  const cjsCode = transpileEsmToCjs(code);
  fs.writeFileSync(tempCjs, cjsCode, 'utf8');
  try {
    return requireCjs(tempCjs);
  } finally {
    try { fs.unlinkSync(tempCjs); } catch {}
  }
}

function isInTempFolder(p) {
  const abs = path.resolve(p);
  return abs.startsWith(TMP_ROOT + path.sep);
}

function isExpressRouter(candidate) {
  return (
    typeof candidate === 'function' ||
    (candidate &&
      typeof candidate === 'object' &&
      (typeof candidate.handle === 'function' || Array.isArray(candidate.stack)))
  );
}

// ---------------- main ----------------

export default async function loadRoutes(
  app,
  basePath = '',
  modulesDir = path.resolve('src/modules'),
  { debug = false } = {}
) {
  const baseNorm = normalizeBase(basePath);

  const entries = fs.existsSync(modulesDir)
    ? fs.readdirSync(modulesDir, { withFileTypes: true })
    : [];
  const dirs = entries.filter(e => e.isDirectory());

  const mounted = [];

  for (const dir of dirs) {
    const routesPath =
      findRoutesFile(modulesDir, dir.name) ||
      path.join(modulesDir, dir.name, 'routes.js');

    if (!fs.existsSync(routesPath)) continue;

    let mod;
    try {
      if (isInTempFolder(routesPath)) {
        // Solo para tests (archivos en %TEMP%): transpila si parece ESM
        const code = fs.readFileSync(routesPath, 'utf8');
        if (looksLikeEsm(code)) {
          mod = loadFromTempAsTranspiledCjs(routesPath);
        } else {
          mod = requireCjsFile(routesPath);
        }
      } else {
        // Producción/proyecto: intenta ESM, si falla, CJS
        try {
          mod = await importEsm(routesPath);
        } catch {
          mod = requireCjsFile(routesPath);
        }
      }
    } catch (err) {
      logger.error(`Error al cargar el módulo de rutas ${routesPath}`, err);
      continue; // ignora módulo roto
    }

    const candidate = mod?.default ?? mod?.router ?? mod;
    if (isExpressRouter(candidate)) {
      const mountPath = buildMountPath(baseNorm, dir.name);
      app.use(mountPath, candidate);
      mounted.push(mountPath);
    }
  }

  if (debug && mounted.length) {
    // Útil para verificar en consola qué se montó en runtime.
    // eslint-disable-next-line no-console
    console.log('[routeLoader] mounted:', mounted);
  }
}
