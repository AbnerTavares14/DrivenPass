import Cryptr from "cryptr";
import { Wifi } from "@prisma/client";
import * as handlerError from "../middlewares/handlerErrorMiddleware.js";
import wifiRepository from "../repositories/wifiRepository.js";

export type CreateWifi = Omit<Wifi, "id">;

async function create(name: string, password: string, title: string, userId: number) {
    const cryptr = new Cryptr("secretPassword");
    const encryptedPassword = cryptr.encrypt(password);
    await wifiRepository.create({ name, password: encryptedPassword, title, userId });
}

async function getWifi(id: number, userId: number) {
    const wifi = await wifiRepository.getWifiById(id, userId);
    const cryptr = new Cryptr("secretPassword");
    if (!wifi) {
        throw handlerError.unauthorized();
    }
    const decryptPassword = cryptr.decrypt(wifi.password);
    return { id: wifi.id, name: wifi.name, password: decryptPassword, title: wifi.title, userId: wifi.userId };
}

async function getAllWifi(userId: number) {
    const wifis = await wifiRepository.getAllWifiOfUser(userId);
    const cryptr = new Cryptr("secretPassword");
    if (wifis) {
        const wifisData = wifis.map((wifi) => {
            let decryptPassword = cryptr.decrypt(wifi.password);
            return { id: wifi.id, name: wifi.name, password: decryptPassword, title: wifi.title, userId: wifi.userId };
        });
        return wifisData;
    } else {
        return {};
    }
}

async function deleteWifi(id: number, userId: number) {
    const wifi = await wifiRepository.getWifiById(id, userId);
    if (!wifi) {
        throw handlerError.unauthorized();
    }
    await wifiRepository.deleteWifi(id);
}

const wifiService = {
    create,
    getWifi,
    getAllWifi,
    deleteWifi
};

export default wifiService;