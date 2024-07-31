import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import * as userRepository from "../repository/user";

export async function authenticate(email: string, password: string) {
  const user = await userRepository.getUser(email);

  if (!user) throw new Error("Login Error");

  const passwordOk = await compare(password, user.password);

  if (!passwordOk) throw new Error("Login Error");

  const secret: string | undefined = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT Secret is not defined");
  }

  const token = sign(
    {
      username: user.name,
      email: user.email,
    },
    secret,
    {
      subject: String(user.id),
    }
  );

  return {
    id: user.id,
    username: user.name,
    email: user.email,
    token: token,
  };
}

export async function createUser(
  name: string,
  email: string,
  password: string
) {
  if (!(name && email && password)) throw new Error("Missing parameters");

  const userExists = await userRepository.getUser(email);

  if (userExists) throw new Error("User already exists");

  const passwordHash = await hash(password, 8);

  const user = await userRepository.createUser(name, email, passwordHash);

  return user;
}
