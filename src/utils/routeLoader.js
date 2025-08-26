import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";

export default async function loadRoutes(app, basePath = "") {
  const modulesDir = path.resolve("src/modules");
  const dirs = fs.readdirSync(modulesDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory());

  for (const dir of dirs) {
    const routesFile = path.join(modulesDir, dir.name, "routes.js");
    if (fs.existsSync(routesFile)) {
      const mod = await import(pathToFileURL(routesFile).href);
      if (mod.default) {
        app.use(basePath + dir.name, mod.default);
      }
    }
  }
}
