import prisma from "../../src/config/db.js";
import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";

function generateAuthData() {
    const email = faker.internet.email();
    const password = faker.internet.password(10);
    return { email, password };
}

function generateNote() {
    const title = faker.lorem.word();
    const anotation = faker.lorem.lines(1);
    return { title, anotation };
}

const testFactory = {
    generateAuthData,
    generateNote
};

export default testFactory;