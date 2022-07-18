import { Request, Response } from "express";
import wifiService from "../services/wifiService.js";


export async function createWifi(req: Request, res: Response) {
    const { name, password, title } = req.body;
    const { id } = res.locals;
    await wifiService.create(name, password, title, id);
    res.sendStatus(201);
}

export async function getWifi(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
        return res.sendStatus(422);
    }
    const userId = res.locals.id;
    const wifi = await wifiService.getWifi(parseInt(id), userId);
    res.send(wifi);
}

export async function getAllWifis(req: Request, res: Response) {
    const { id } = res.locals;
    const wifis = await wifiService.getAllWifi(id);
    res.send(wifis);
}

export async function deleteWifi(req: Request, res: Response) {
    const { id } = req.params;
    const userId = res.locals.id;
    await wifiService.deleteWifi(parseInt(id), userId);
    res.sendStatus(200);
}