import { Router } from "express";
import credentialSchema from "../schemas/credentialSchema.js";
import validateSchema from "../middlewares/schemaValidator.js";
import { verifyToken } from "../middlewares/validateToken.js";
import { createCredential, deleteCredential, getCredential, getCredentialsOfuser } from "../controllers/credentialController.js";

const credentialRouter = Router();

credentialRouter.post("/credentials", validateSchema(credentialSchema), verifyToken, createCredential);
credentialRouter.get("/credentials", verifyToken, getCredentialsOfuser);
credentialRouter.get("/credentials/:id", verifyToken, getCredential);
credentialRouter.delete("/credentials/:id", verifyToken, deleteCredential);

export default credentialRouter;