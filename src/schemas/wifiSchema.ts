import { Wifi } from "@prisma/client";
import Joi from "joi";

const wifiSchema = Joi.object<Wifi>({
    name: Joi.string().required(),
    password: Joi.string().required(),
    title: Joi.string().required()
});

export default wifiSchema;