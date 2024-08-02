import { api } from '../api/config';

const baseUrl = '/equipment';

export async function getAllEquipment() {
    return api.get(baseUrl);
}

export async function createEquipment(data) {
    return api.post(baseUrl + "/add", data);
}

export async function updateEquipment(id, data) {
    return api.put(baseUrl + "/update/" + id, data);
}

export async function deleteEquipment(id) {
    return api.delete(baseUrl + "/delete/" + id);
}
