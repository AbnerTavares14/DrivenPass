import Joi from "joi";
import { Notes } from "@prisma/client";

const noteSchema = Joi.object<Notes>({
    title: Joi.string().max(50).required(),
    anotation: Joi.string().max(1000).required()
});

export default noteSchema;