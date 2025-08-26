import express from "express";
import { success } from "../../net/responses.js";
import controller from "./index.js";
import security from "./security.js";
import asyncHandler from "../../utils/asyncHandler.js";

const router = express.Router();

router.get("/", asyncHandler(all));
router.get("/:id", asyncHandler(one));
router.post("/", security(), asyncHandler(create));
router.put("/", security(), asyncHandler(update));
router.delete("/", security(), asyncHandler(eliminate));

async function all(req, res) {
    const items = await controller.all();
    success(req, res, items, 200);
}

async function one(req, res) {
    const items = await controller.one(req.params.id);
    success(req, res, items, 200);
}

async function eliminate(req, res) {
    const items = await controller.eliminate(req.body);
    success(req, res, "Item eliminado satisfactoriamente", 200);
}

async function create(req, res) {
  let message = "";
    const items = await controller.create(req.body);
    message = "Item guardado con éxito";
    success(req, res, message, 201);
}

async function update(req, res) {
  let message = "";
    const items = await controller.update(req.body);
    message = "Item actualizado con éxito";
    success(req, res, message, 201);
}

export default router;
