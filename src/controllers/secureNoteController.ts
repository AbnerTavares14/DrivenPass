import { Request, Response } from "express";
import secureNoteService from "../services/secureNoteService.js";

export async function createNote(req: Request, res: Response) {
    const { title, anotation } = req.body;
    const { id } = res.locals;
    await secureNoteService.create(title, anotation, id);
    res.sendStatus(201);
}

export async function getNote(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
        return res.sendStatus(422);
    }
    const userId = res.locals.id;
    const note = await secureNoteService.getNote(parseInt(id), userId);
    res.send(note);
}

export async function getNotes(req: Request, res: Response) {
    const { id } = res.locals;
    const notes = await secureNoteService.getNotes(id);
    res.send(notes);
}

export async function deleteNote(req: Request, res: Response) {
    const { id } = req.params;
    const userId: number = res.locals.id;
    if (!id) {
        return res.sendStatus(422);
    }
    await secureNoteService.deleteNote(parseInt(id), userId);
    res.sendStatus(200);
}