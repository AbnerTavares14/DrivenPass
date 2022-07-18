import { Cards } from "@prisma/client";
import cardRepository from "../repositories/cardRepository.js";
import * as handlerError from "../middlewares/handlerErrorMiddleware.js";
import Cryptr from "cryptr";

export type CreateCard = Omit<Cards, "id">;

type cardTypes =
    | "credit"
    | "debit"
    | "both"

async function create(number: string, cardHolderName: string, securityCode: string, expirationDate: string, password: string, isVirtual: boolean, type: cardTypes, title: string, userId: number) {
    const cryptr = new Cryptr("secretPassword");
    const encryptedPassword = cryptr.encrypt(password);
    const encryptedCvv = cryptr.encrypt(securityCode);
    await cardRepository.create({ number, cardHolderName, password: encryptedPassword, securityCode: encryptedCvv, expirationDate, isVirtual, type, title, userId });
}

async function getCard(id: number, userId: number) {
    const card = await cardRepository.getCardById(id, userId);
    const cryptr = new Cryptr("secretPassword");
    if (!card) {
        throw handlerError.unauthorized();
    }
    const decryptedPassword = cryptr.decrypt(card.password);
    const decryptedCvv = cryptr.decrypt(card.securityCode);
    const data = { number: card.number, cardHolderName: card.cardHolderName, password: decryptedPassword, securityCode: decryptedCvv, expirationDate: card.expirationDate, isVirtual: card.isVirtual, type: card.type, title: card.title, userId: card.userId }
    return data;
}

async function getAllCardsOfUser(userId: number) {
    const cards = await cardRepository.getCards(userId);
    const cryptr = new Cryptr("secretPassword");
    if (cards) {
        const dataOfCards = cards.map((card) => {
            let decryptedPassword = cryptr.decrypt(card.password);
            let decryptedCvv = cryptr.decrypt(card.securityCode);
            let data: Cards = { id: card.id, number: card.number, cardHolderName: card.cardHolderName, password: decryptedPassword, securityCode: decryptedCvv, expirationDate: card.expirationDate, isVirtual: card.isVirtual, type: card.type, title: card.title, userId: card.userId };
            return data;
        });
        return dataOfCards;
    } else {
        return {};
    }
}

async function deleteCard(id: number, userId: number) {
    const card = await cardRepository.getCardById(id, userId);
    if (!card) {
        throw handlerError.unauthorized();
    }
    await cardRepository.deleteCard(id);
}

const cardService = {
    create,
    getCard,
    getAllCardsOfUser,
    deleteCard
};

export default cardService;