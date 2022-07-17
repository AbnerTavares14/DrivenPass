import Cryptr from "cryptr";
import credentialRepository from "../repositories/credentialRepository.js";
import * as handlerError from "../middlewares/handlerErrorMiddleware.js";
import { Credentials } from "@prisma/client";

export type CreateCredential = Omit<Credentials, "id">

async function create(title: string, url: string, password: string, username: string, id: number) {
    const credential = await credentialRepository.getCredential(id, title);
    if (credential) {
        throw handlerError.conflict();
    }
    const cryptr = new Cryptr("secretPassword");
    const encryptedPassword = cryptr.encrypt(password);
    const data = { url, title, username, password: encryptedPassword, userId: id }
    await credentialRepository.create(data);
}

async function getCredential(id: number, userId: number) {
    const credential = await credentialRepository.getCredentialById(id, userId);
    if (!credential) {
        throw handlerError.notFoundError();
    }
    const cryptr = new Cryptr("secretPassword");
    const decryptedPassword = cryptr.decrypt(credential.password);
    const data: Credentials = { id: credential.id, url: credential.url, title: credential.url, username: credential.username, password: decryptedPassword, userId: credential.userId };
    return data;
}

async function getCredentials(id: number) {
    const credentials = await credentialRepository.getAllCredentialsOfUser(id);
    if (credentials) {
        const dataOfCredentials = credentials.map((credential) => {
            const cryptr = new Cryptr("secretPassword");
            const decryptedPassword = cryptr.decrypt(credential.password);
            const data: Credentials = { id: credential.id, url: credential.url, title: credential.url, username: credential.username, password: decryptedPassword, userId: credential.userId };
            return data;
        });
        return dataOfCredentials;
    } else {
        return {};
    }
}

async function deleteCredential(id: number, userId: number) {
    const credential = await credentialRepository.getCredentialById(id, userId);
    if (!credential) {
        throw handlerError.unauthorized();
    }
    await credentialRepository.deletion(id);
}


const credentialService = {
    create,
    getCredential,
    getCredentials,
    deleteCredential
};

export default credentialService;