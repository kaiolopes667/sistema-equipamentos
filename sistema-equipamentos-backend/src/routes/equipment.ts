import express from "express";
import { addEquipment, deleteEquipment, getEquipments, updateEquipment } from "../controllers/equipment";

const router = express.Router()

router.get("/equipment", getEquipments)

router.post("/equipment/add", addEquipment)

router.put("equipment/update/:id", updateEquipment)

router.delete("equipment/delete/:id", deleteEquipment)

export default router