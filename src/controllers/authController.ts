import { Request, Response } from "express";
import authService from "../services/authService.js";


export async function createUser(req: Request, res: Response) {
    const { email, password } = req.body;
    await authService.create(email, password);
    res.sendStatus(200);
}

export async function login(req: Request, res: Response) {
    const { email, password } = req.body;
    const token = await authService.login(email, password);
    res.send(token);
}