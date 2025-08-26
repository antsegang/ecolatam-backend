import assert from 'assert';
import express from 'express';
import fs from 'fs';
import os from 'os';
import path from 'path';
import module from 'module';
import loadRoutes from '../src/utils/routeLoader.js';

process.env.NODE_PATH = path.join(process.cwd(), 'node_modules');
module.Module._initPaths();

describe('routeLoader', () => {
  let tmpDir;
  let server;
  let base;

  before(async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'modules-'));
    const modDir = path.join(tmpDir, 'dummy');
    fs.mkdirSync(modDir);
    fs.writeFileSync(
      path.join(modDir, 'routes.js'),
      "import { Router } from 'express';\nconst router = Router();\nrouter.get('/', (req,res)=>res.json({ ok: true }));\nexport default router;\n"
    );
    const app = express();
    await loadRoutes(app, '', tmpDir);
    server = app.listen(0);
    const { port } = server.address();
    base = `http://localhost:${port}`;
  });

  after(() => {
    server.close();
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it('loads routes from given directory', async () => {
    const res = await fetch(`${base}/dummy`);
    assert.strictEqual(res.status, 200);
    const body = await res.json();
    assert.deepStrictEqual(body, { ok: true });
  });
});
