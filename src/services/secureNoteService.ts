import { Notes } from "@prisma/client";
import * as handlerError from "../middlewares/handlerErrorMiddleware.js";
import secureNoteRepository from "../repositories/secureNoteRepository.js";

export type CreateNote = Omit<Notes, "id">;

async function create(title: string, anotation: string, id: number) {
    await secureNoteRepository.create({ title, anotation, userId: id });
}

async function getNote(id: number, userId: number) {
    const note = await secureNoteRepository.getNoteById(id, userId);
    if (!note) {
        throw handlerError.unauthorized();
    }
    return note;
}

async function getNotes(userId: number) {
    const notes = await secureNoteRepository.getNotes(userId);
    return notes;
}

async function deleteNote(id: number, userId: number) {
    const note = await secureNoteRepository.getNoteById(id, userId);
    if (!note) {
        throw handlerError.unauthorized();
    }
    await secureNoteRepository.deleteNote(id);
}

const secureNoteService = {
    create,
    getNote,
    getNotes,
    deleteNote
};

export default secureNoteService;