import { Router } from "express";
import { deleteCard, getCard, getCardsOfUser, registerCard } from "../controllers/cardController.js";
import validateSchema from "../middlewares/schemaValidator.js";
import { verifyToken } from "../middlewares/validateToken.js";
import cardSchema from "../schemas/cardSchema.js";

const cardRouter = Router();

cardRouter.post("/cards", validateSchema(cardSchema), verifyToken, registerCard);
cardRouter.get("/cards", verifyToken, getCardsOfUser);
cardRouter.get("/cards/:id", verifyToken, getCard);
cardRouter.delete("/cards/:id", verifyToken, deleteCard);


export default cardRouter;