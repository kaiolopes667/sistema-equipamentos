import * as equipmentRepository from "../repository/equipment";

export async function addEquipment(person_name: string, email: string, type: string, asset_number: number, create_user_id: number) {
    if (!(person_name && email && type && asset_number && create_user_id)) throw new Error("Missing parameters!");

    await equipmentRepository.addEquipment(person_name, email, type, Number(asset_number), Number(create_user_id));
}

export async function deleteEquipment (equipmentId: number|null) {
    if (!equipmentId) throw new Error("Missing equipmentId!");

    await equipmentRepository.deleteEquipment(equipmentId);
}

export async function getEquipments () {
    const equipmentsInfo = await equipmentRepository.getEquipments();

    return equipmentsInfo;
}

export async function updateEquipment (equipment_id: number, person_name: string, email: string, type: string, asset_number: number) {
    if (!(equipment_id && person_name && email && type && asset_number)) throw new Error("Missing parameters!");

    await equipmentRepository.updateEquipment(equipment_id, person_name, email, type, asset_number);
}
