import { Router } from "express";
import validateSchema from "../middlewares/schemaValidator.js";
import { verifyToken } from "../middlewares/validateToken.js";
import wifiSchema from "../schemas/wifiSchema.js";
import { createWifi, deleteWifi, getAllWifis, getWifi } from "../controllers/wifiController.js";

const wifiRouter = Router();

wifiRouter.post("/wifi", validateSchema(wifiSchema), verifyToken, createWifi);
wifiRouter.get("/wifi", verifyToken, getAllWifis);
wifiRouter.get("/wifi/:id", verifyToken, getWifi);
wifiRouter.delete("/wifi/:id", verifyToken, deleteWifi);

export default wifiRouter;