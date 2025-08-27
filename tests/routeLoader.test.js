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
    const dummyDir = path.join(tmpDir, 'dummy');
    fs.mkdirSync(dummyDir);
    fs.writeFileSync(
      path.join(dummyDir, 'routes.js'),
      "import { Router } from 'express';\nconst router = Router();\nrouter.get('/', (req,res)=>res.json({ ok: true }));\nexport default router;\n"
    );
    const extraDir = path.join(tmpDir, 'extra');
    fs.mkdirSync(extraDir);
    fs.writeFileSync(
      path.join(extraDir, 'routes.js'),
      "import { Router } from 'express';\nconst router = Router();\nrouter.get('/', (req,res)=>res.json({ extra: true }));\nexport default router;\n"
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

  it('supports include option', async () => {
    const app = express();
    await loadRoutes(app, '', tmpDir, { include: ['extra'] });
    const srv = app.listen(0);
    const { port } = srv.address();
    const url = `http://localhost:${port}`;
    let res = await fetch(`${url}/extra`);
    assert.strictEqual(res.status, 200);
    res = await fetch(`${url}/dummy`);
    assert.strictEqual(res.status, 404);
    srv.close();
  });

  it('supports exclude option', async () => {
    const app = express();
    await loadRoutes(app, '', tmpDir, { exclude: ['extra'] });
    const srv = app.listen(0);
    const { port } = srv.address();
    const url = `http://localhost:${port}`;
    let res = await fetch(`${url}/dummy`);
    assert.strictEqual(res.status, 200);
    res = await fetch(`${url}/extra`);
    assert.strictEqual(res.status, 404);
    srv.close();
  });
});
