import { Sessions, User } from "@prisma/client"
import authRepository from "../repositories/authRepository.js";
import * as handlerError from "../middlewares/handlerErrorMiddleware.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export type CreateUser = Omit<User, "id">;

export type CreateSession = Omit<Sessions, "id">;

async function create(email: string, password: string) {
    const user = await authRepository.getUser(email);
    console.log(user);
    if (user) {
        throw handlerError.conflict();
    }
    const salt = 10;
    const encryptedPassword = bcrypt.hashSync(password, salt);
    const data: CreateUser = { email, password: encryptedPassword }
    await authRepository.insert(data);
}

async function login(email: string, password: string) {
    const user = await authRepository.getUser(email);
    if (!user) {
        throw handlerError.unprocessableEntity();
    }
    if (bcrypt.compareSync(password, user.password)) {
        const secretKey = process.env.JWT_SECRET;
        const token = jwt.sign({ id: user.id }, secretKey);
        const data: CreateSession = { token, userId: user.id };
        await authRepository.login(data);
        return token;
    } else {
        throw handlerError.unauthorized();
    }

}

const authService = {
    create,
    login
};

export default authService;