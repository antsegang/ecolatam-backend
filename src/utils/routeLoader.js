// src/utils/routeLoader.js
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';
import { createRequire } from 'module';

const requireCjs = createRequire(import.meta.url);

async function importEsm(filePath) {
  return import(pathToFileURL(filePath).href);
}

function requireCjsFile(filePath) {
  return requireCjs(filePath);
}

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

function looksLikeEsm(content) {
  // heurística simple: detecta "import ... from" o "export ..."
  return /\bimport\s+[\s\S]+?\sfrom\s+['"]/.test(content) || /\bexport\s+/.test(content);
}

async function importJsAsEsmViaTempMjs(originalJsPath) {
  const dir = path.dirname(originalJsPath);
  const base = path.basename(originalJsPath, '.js');
  const tempFile = path.join(dir, `${base}.${process.pid}.${Date.now()}.temp.mjs`);
  const code = fs.readFileSync(originalJsPath, 'utf8');
  fs.writeFileSync(tempFile, code, 'utf8');
  try {
    return await importEsm(tempFile);
  } finally {
    try { fs.unlinkSync(tempFile); } catch {}
  }
}

export default async function loadRoutes(
  app,
  basePath = '',
  modulesDir = path.resolve('src/modules')
) {
  const entries = fs.readdirSync(modulesDir, { withFileTypes: true });
  const dirs = entries.filter(e => e.isDirectory());
  const baseNorm = normalizeBase(basePath);

  for (const dir of dirs) {
    const routesPath =
      findRoutesFile(modulesDir, dir.name) ||
      path.join(modulesDir, dir.name, 'routes.js');

    if (!fs.existsSync(routesPath)) continue;

    let mod;
    const ext = path.extname(routesPath);

    try {
      if (ext === '.mjs') {
        mod = await importEsm(routesPath);
      } else if (ext === '.cjs') {
        mod = requireCjsFile(routesPath);
      } else {
        // .js: intenta ESM; si falla, decide por CONTENIDO si reintentar como .mjs o CJS
        try {
          mod = await importEsm(routesPath);
        } catch {
          const content = fs.readFileSync(routesPath, 'utf8');
          if (looksLikeEsm(content)) {
            mod = await importJsAsEsmViaTempMjs(routesPath);
          } else {
            mod = requireCjsFile(routesPath);
          }
        }
      }
    } catch {
      // módulo problemático: sigue con el siguiente
      continue;
    }

    const candidate = mod?.default ?? mod?.router ?? mod;
    const isRouter =
      typeof candidate === 'function' ||
      (candidate && typeof candidate === 'object' &&
        (typeof candidate.handle === 'function' || Array.isArray(candidate.stack)));

    if (isRouter) {
      const mountPath = buildMountPath(baseNorm, dir.name);
      app.use(mountPath, candidate);
    }
  }
}
