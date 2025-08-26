import express from "express";
import { success } from "../../net/responses.js";
import controller from "./index.js";
import security from "./security.js";
import asyncHandler from "../../utils/asyncHandler.js";

const router = express.Router();

router.get("/", asyncHandler(all));
router.get("/:id", asyncHandler(one));
router.post("/", security.checkOwner(), asyncHandler(request));
router.put("/", security.checkAdmin(), asyncHandler(approve));
router.delete("/", security.checkAdmin(), asyncHandler(decline));

async function all(req, res) {
    const limit = Number(req.query.limit ?? 10);
    const offset = Number(req.query.offset ?? 0);
    const items = await controller.all(limit, offset);
    success(req, res, items, 200);
}

async function one(req, res) {
    const items = await controller.one(req.params.id);
    success(req, res, items, 200);
}

async function decline(req, res) {
    await controller.decline(req.body);
    success(req, res, "Item eliminado satisfactoriamente", 200);
}

async function request(req, res) {
  let message = "";
    await controller.request(req.body);
    message = "Item guardado con éxito";
    success(req, res, message, 201);
}

async function approve(req, res) {
  let message = "";
    await controller.approve(req.body);
    message = "Item actualizado con éxito";
    success(req, res, message, 201);
}

export default router;
