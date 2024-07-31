import prismaClient from "../prisma";

export async function addEquipment(person_name: string, email: string, type: string, asset_number: number, created_by_user_id: number) {
    await prismaClient.equipment.create({
        data: {
            person_name,
            asset_number,
            email,
            type,
            created_by_user_id,
        }
    })
}

export async function deleteEquipment (equipmentId: number) {
    await prismaClient.equipment.delete({
        where: {
            id: equipmentId
        }
    })
}

export async function getEquipments () {
    const equipments = await prismaClient.equipment.findMany({
        select: {
            person_name: true,
            email: true,
            type: true,
            asset_number: true,
        }
    })

    return equipments;
}

export async function updateEquipment (equipment_id: number, person_name: string, email: string, type: string, asset_number: number) {
    await prismaClient.equipment.update({
        where: {
            id: equipment_id
        },
        data: {
            person_name,
            email,
            type,
            asset_number,
        }
    })
}
