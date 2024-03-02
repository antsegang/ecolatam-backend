import express from "express";

import { success } from "../../net/responses.js";
import controller from "./index.js";

const router = express.Router();

router.post("/login", login); // Cambiado a router.post

async function login(req, res, next) {
  try {
    const data = req.body;
    // Ahora puedes acceder a los datos del cuerpo como req.body.username
    const username = data.username;
    const password = data.password;

    const response = await controller.login(username, password);

    success(
      req,
      res,
      { token: response.token, data: response.datos, id: response.id },
      200
    );
  } catch (err) {
    next(err);
  }
}

export default router;
