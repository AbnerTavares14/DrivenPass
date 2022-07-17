import { request, Request, Response } from "express";
import credentialService from "../services/credentialService.js";

export async function createCredential(req: Request, res: Response) {
    const { url, title, username, password } = req.body;
    const { id } = res.locals;
    await credentialService.create(title, url, password, username, id);
    res.sendStatus(201);
}

export async function getCredentialsOfuser(req: Request, res: Response) {
    const { id } = res.locals;
    const credentials = await credentialService.getCredentials(id);
    res.send(credentials);
}

export async function getCredential(req: Request, res: Response) {
    const { id } = req.params;
    const userId = res.locals.id;
    const credential = await credentialService.getCredential(parseInt(id), userId);
    res.send(credential);
}

export async function deleteCredential(req: Request, res: Response) {
    const { id } = req.params;
    const userId = res.locals.id;
    await credentialService.deleteCredential(parseInt(id), userId);
    res.sendStatus(200);
}