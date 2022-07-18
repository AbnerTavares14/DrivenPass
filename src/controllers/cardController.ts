import { Request, Response } from "express";
import cardRepository from "../repositories/cardRepository";
import cardService from "../services/cardService";



export async function registerCard(req: Request, res: Response) {
    const { number, cardHolderName, securityCode, expirationDate, password, isVirtual, type, title } = req.body;
    const { id } = res.locals;
    await cardService.create(number, cardHolderName, securityCode, expirationDate, password, isVirtual, type, title, id);
    res.sendStatus(201);
}

export async function getCard(req: Request, res: Response) {
    const { id } = req.params;
    const userId = res.locals.id;
    if (!id) {
        return res.sendStatus(422);
    }
    const card = await cardService.getCard(parseInt(id), userId);
    res.send(card);
}

export async function getCardsOfUser(req: Request, res: Response) {
    const { id } = res.locals;
    const cards = await cardService.getAllCardsOfUser(id);
    res.send(cards);
}

export async function deleteCard(req: Request, res: Response) {
    const { id } = req.params;
    const userId = res.locals.id;
    if (!id) {
        return res.sendStatus(422);
    }
    await cardService.deleteCard(parseInt(id), userId);
    res.sendStatus(200);
}