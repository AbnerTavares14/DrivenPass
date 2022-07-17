import { Router } from "express";
import { createUser, login } from "../controllers/authController.js";
import validateSchema from "../middlewares/schemaValidator.js";
import userSchema from "../schemas/userSchema.js";

const authRouter = Router();

authRouter.post("/signup", validateSchema(userSchema), createUser);
authRouter.post("/login", validateSchema(userSchema), login);

export default authRouter;