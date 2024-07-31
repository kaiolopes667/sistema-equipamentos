import { Request, Response } from "express";
import * as equipmentBusiness from "../business/equipment";

export async function addEquipment(req: Request, res: Response) {
  const { person_name, email, type, asset_number, created_by_user_id } =  req.body;

  await equipmentBusiness.addEquipment(person_name, email, type, asset_number, created_by_user_id);

  return res.json("OK");
}

export async function deleteEquipment(req: Request, res: Response) {
  const equipmentId = Number(req.params.equipmentId) || null;

  await equipmentBusiness.deleteEquipment(equipmentId);

  return res.json("OK");
}

export async function getEquipments(_req: Request, res: Response) {
  const equipments = await equipmentBusiness.getEquipments();

  return res.json(equipments);
}

export async function updateEquipment(req: Request, res: Response) {
  const { equipment_id, person_name, email, type, asset_number } = req.body;

  await equipmentBusiness.updateEquipment(
    equipment_id,
    person_name,
    email,
    type,
    asset_number
  );

  return res.json("OK");
}
