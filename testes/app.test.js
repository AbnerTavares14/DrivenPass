import app from "../src/index.js";
import prisma from "../src/config/db.js";
import testFactory from "./factories/authFactory.js";
import supertest from "supertest";

beforeEach(async () => {
    await prisma.$executeRaw`DELETE FROM "User";`;
});

describe("POST signup and login", () => {
    it("return status code 201", async () => {
        const body = testFactory.generateAuthData();
        const result = await supertest(app).post("/signup").send(body);
        const status = result.status;
        const userCreated = await prisma.user.findFirst({
            where: { email: body.email }
        });

        expect(status).toEqual(200);
        expect(userCreated).not.toBeNull();
    });


    it("return token", async () => {
        const body = testFactory.generateAuthData();
        await supertest(app).post("/signup").send(body);
        const token = await supertest(app).post("/login").send(body);
        expect(token).not.toBeNull();
    });

});

describe("POST, GET and DELETE notes", () => {
    it("return status code 201", async () => {
        try {
            const bodyUser = testFactory.generateAuthData();
            await supertest(app).post("/signup").send(bodyUser);
            const result = supertest(app).post("/login").send(bodyUser);
            const body = testFactory.generateNote();
            const note = await supertest(app).post("/notes").send(body).set("Authorization", `Bearer ${result.body}`);
            expect(note.status).toEqual(201);
        } catch (err) {
            console.log(err);
        }
    });

    it("return notes", async () => {
        try {
            const bodyUser = testFactory.generateAuthData();
            await supertest(app).post("/signup").send(bodyUser);
            const result = supertest(app).post("/login").send(bodyUser);
            const body = testFactory.generateNote();
            await supertest(app).post("/notes").send(body).set("Authorization", `Bearer ${result.body}`);
            const notes = supertest(app).get("/notes").set("Authorization", `Bearer ${result.body}`);
            expect(notes.body).not.toBeNull();
        } catch (err) {
            console.log(err);
        }
    });

    it("return status code 200", async () => {
        try {
            const bodyUser = testFactory.generateAuthData();
            await supertest(app).post("/signup").send(bodyUser);
            const result = supertest(app).post("/login").send(bodyUser);
            const body = testFactory.generateNote();
            await supertest(app).post("/notes").send(body).set("Authorization", `Bearer ${result.body}`);
            const notes = supertest(app).delete("/notes/1").set("Authorization", `Bearer ${result.body}`);
            expect(notes.status).toEqual(200);
        } catch (err) {
            console.log(err);
        }
    });
})

afterAll(async () => {
    await prisma.$disconnect();
});