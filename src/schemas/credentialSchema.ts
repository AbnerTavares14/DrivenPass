import { Credentials } from "@prisma/client";
import Joi from "joi";

const credentialSchema = Joi.object<Credentials>({
    title: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    url: Joi.string().pattern(/^[a-zA-Z0-9-_]+[:./\\]+([a-zA-Z0-9 -_./:=&"'?%+@#$!])+$/)
});

export default credentialSchema;