import prisma from "../config/db.js";
import { CreateCard } from "../services/cardService.js";

async function create(createCard: CreateCard) {
    return prisma.cards.create({ data: createCard });
}

async function getCardById(id: number, userId: number) {
    return prisma.cards.findFirst({
        where: {
            id,
            userId: {
                equals: userId
            }
        }
    });
}

async function getCards(id: number) {
    return prisma.cards.findMany({
        where: { id }
    });
}

async function deleteCard(id: number) {
    return prisma.cards.delete({ where: { id } });
}

const cardRepository = {
    create,
    getCardById,
    getCards,
    deleteCard
};

export default cardRepository;