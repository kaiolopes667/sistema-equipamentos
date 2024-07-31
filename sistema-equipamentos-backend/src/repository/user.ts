import prismaClient from "../prisma";

export async function getUser(email: string) {
    const user = await prismaClient.user.findFirst({ where: { email }});

    return user;
}

export async function createUser(name: string, email: string, password: string) {
    const user = await prismaClient.user.create({
        data: {
            name,
            email,
            password,
        }
    })

    return user;
}