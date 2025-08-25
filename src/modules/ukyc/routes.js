import express from "express";
import { success } from "../../net/responses.js";
import controller from "./index.js";
import security from "./security.js";

const router = express.Router();

router.get("/", security.checkAdmin(), all);
router.get("/:id", one);
router.post("/", security.checkAuth(), request);
router.put("/", security.checkAdmin(), approve);
router.delete("/", security.checkAdmin(), decline);

async function all(req, res, next) {
  try {
    const items = await controller.all();
    success(req, res, items, 200);
  } catch (err) {
    next(err);
  }
}

async function one(req, res, next) {
  try {
    const items = await controller.one(req.params.id);
    success(req, res, items, 200);
  } catch (err) {
    next(err);
  }
}

async function decline(req, res, next) {
  try {
    const items = await controller.decline(req.body);
    success(req, res, "Item eliminado satisfactoriamente", 200);
  } catch (err) {
    next(err);
  }
}

async function request(req, res, next) {
  let message = "";
  try {
    const items = await controller.request(req.body);
    message = "Item guardado con éxito";
    success(req, res, message, 201);
  } catch (err) {
    next(err);
  }
}

async function approve(req, res, next) {
  let message = "";
  try {
    const items = await controller.approve(req.body);
    message = "Item actualizado con éxito";
    success(req, res, message, 201);
  } catch (err) {
    next(err);
  }
}

export default router;
