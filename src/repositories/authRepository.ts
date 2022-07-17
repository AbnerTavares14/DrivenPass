import prisma from "../config/db.js";
import { CreateUser, CreateSession } from "../services/authService.js";

async function insert(user: CreateUser) {
    await prisma.user.create({ data: user });
}

async function getUser(email: string) {
    return prisma.user.findFirst({
        where: {
            email: {
                equals: email
            }
        }
    });
}

async function login(session: CreateSession) {
    return prisma.sessions.create({ data: session });
}

const authRepository = {
    insert,
    getUser,
    login
};

export default authRepository;