import { Router } from "express";
import { createNote, deleteNote, getNote, getNotes } from "../controllers/secureNoteController.js";
import { verifyToken } from "../middlewares/validateToken.js";
import validateSchema from "../middlewares/schemaValidator.js";
import noteSchema from "../schemas/secureNoteSchema.js";

const noteRouter = Router();

noteRouter.post("/notes", validateSchema(noteSchema), verifyToken, createNote);
noteRouter.get("/notes", verifyToken, getNotes);
noteRouter.get("/notes/:id", verifyToken, getNote);
noteRouter.delete("/notes/:id", verifyToken, deleteNote);

export default noteRouter;