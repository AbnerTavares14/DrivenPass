import { Cards } from "@prisma/client";
import Joi from "joi";

const cardSchema = Joi.object<Cards>({
    number: Joi.string().required(),
    cardHolderName: Joi.string().required(),
    password: Joi.string().required(),
    securityCode: Joi.string().required(),
    expirationDate: Joi.string().required(),
    isVirtual: Joi.boolean().required(),
    type: Joi.string().required(),
    title: Joi.string().required(),
    userId: Joi.number().required()
});

export default cardSchema;