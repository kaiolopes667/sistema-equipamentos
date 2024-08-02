import { api } from '../api/config';

const baseUrl = '/user';

export async function login(data) {
    return api.post(baseUrl + "/Login", data);
}
