import express from "express";
import { addEquipment, deleteEquipment, getEquipments, getEquipmentsById, updateEquipment } from "../controllers/equipment";
import asyncHandler from '../asyncHandler';

const router = express.Router()

router.get("/equipment", asyncHandler(getEquipments))

router.get("/equipment/:id", asyncHandler(getEquipmentsById))

router.post("/equipment/add", asyncHandler(addEquipment))

router.put("/equipment/update/:id", asyncHandler(updateEquipment))

router.delete("/equipment/delete/:id", asyncHandler(deleteEquipment))

export default router