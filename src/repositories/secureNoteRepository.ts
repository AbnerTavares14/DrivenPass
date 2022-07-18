import prisma from "../config/db.js";
import { CreateNote } from "../services/secureNoteService.js";


async function create(createNote: CreateNote) {
    return prisma.notes.create({ data: createNote });
}

async function getNoteById(id: number, userId: number) {
    return prisma.notes.findFirst({
        where: {
            id: id,
            userId: {
                equals: userId
            }
        }
    });
}

async function getNotes(id: number) {
    return prisma.notes.findMany({
        where: {
            userId: {
                equals: id
            }
        }
    });
}

async function deleteNote(id: number) {
    return prisma.notes.delete({ where: { id } });
}

const secureNoteRepository = {
    create,
    getNoteById,
    getNotes,
    deleteNote
};

export default secureNoteRepository;