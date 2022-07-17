import jwt from "jsonwebtoken";
import credentialSchema from "../schemas/credentialSchema.js";
import { unauthorized } from "./handlerErrorMiddleware.js";

export async function verifyToken(req, res, next) {
    const authorization = req.headers.authorization || "";
    const token = authorization.replace("Bearer ", "");

    if (!token) {
        throw unauthorized();
    }
    let user = jwt.verify(token, process.env.JWT_SECRET);
    if (user) {
        res.locals.id = user.id;
        next();
    }
}