import { Request, Response } from "express";
import * as userBusiness from '../business/user';

export async function authenthicate(request: Request, response: Response) {
    const { email, password } = request.body;

    const auth = await userBusiness.authenticate(email, password);

    return response.json(auth);
}

export async function createUser(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const user = await userBusiness.createUser(name, email, password);

    return response.json(user);
}
