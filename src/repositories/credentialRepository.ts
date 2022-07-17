import prisma from "../config/db.js";
import { CreateCredential } from "../services/credentialService.js";

async function getCredential(id: number, title: string) {
    return prisma.credentials.findFirst({
        where: {
            userId: {
                equals: id
            },
            title: {
                equals: title
            }
        }
    });
}

async function getCredentialById(id: number, userId: number) {
    return prisma.credentials.findFirst({
        where: {
            id,
            userId: {
                equals: userId
            }
        }
    });
}

async function getAllCredentialsOfUser(id: number) {
    return prisma.credentials.findMany({
        where: {
            userId: {
                equals: id
            }
        }
    });
}

async function create(CreateCredential: CreateCredential) {
    return prisma.credentials.create({ data: CreateCredential });
}

async function deletion(id: number) {
    return prisma.credentials.delete({ where: { id } });
}

const credentialRepository = {
    getCredential,
    create,
    getCredentialById,
    getAllCredentialsOfUser,
    deletion
};

export default credentialRepository;