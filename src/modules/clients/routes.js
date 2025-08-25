import express from "express";
import { success } from "../../net/responses.js";
import controller from "./index.js";

const router = express.Router();

router.get("/", all);
router.get("/:id", one);
router.post("/", create);
router.put("/", update);
router.delete("/", eliminate);

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

async function eliminate(req, res, next) {
  try {
    const items = await controller.eliminate(req.body);
    success(req, res, "Item eliminado satisfactoriamente", 200);
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  let message = "";
  try {
    const items = await controller.create(req.body);
    message = "Item guardado con éxito";
    success(req, res, message, 201);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  let message = "";
  try {
    const items = await controller.update(req.body);
    message = "Item actualizado con éxito";
    success(req, res, message, 201);
  } catch (err) {
    next(err);
  }
}

export default router;
