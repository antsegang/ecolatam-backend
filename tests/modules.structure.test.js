import assert from 'assert';
import fs from 'fs';
import path from 'path';
import Joi from 'joi';
import { pathToFileURL } from 'url';

const modulesDir = path.join(process.cwd(), 'src', 'modules');
const modules = fs.readdirSync(modulesDir).filter((f) => fs.statSync(path.join(modulesDir, f)).isDirectory());

describe('Module structure', () => {
  modules.forEach((mod) => {
    const modulePath = path.join(modulesDir, mod);
    describe(mod, () => {
      it('exports a router', async () => {
        const routeFile = path.join(modulePath, 'routes.js');
        const { default: router } = await import(pathToFileURL(routeFile).href);
        assert.ok(router, 'router not exported');
        assert.ok(Array.isArray(router.stack), 'router stack not found');
      });

      it('controller exports functions', async () => {
        const controllerFile = path.join(modulePath, 'controller.js');
        const { default: controllerFactory } = await import(pathToFileURL(controllerFile).href);
        const controller = controllerFactory({});
        assert.ok(controller && typeof controller === 'object');
        const funcs = Object.values(controller).filter((v) => typeof v === 'function');
        assert.ok(funcs.length > 0, 'controller has no functions');
      });

      const validatorFile = path.join(modulePath, 'validator.js');
      if (fs.existsSync(validatorFile)) {
        it('validator exports Joi schemas', async () => {
          const validator = await import(pathToFileURL(validatorFile).href);
          const schemas = Object.values(validator);
          assert.ok(schemas.length > 0, 'no schemas exported');
          schemas.forEach((schema) => {
            assert.ok(Joi.isSchema ? Joi.isSchema(schema) : schema.isJoi, 'not a Joi schema');
          });
        });
      }
    });
  });
});
