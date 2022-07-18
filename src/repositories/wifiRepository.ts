import prisma from "../config/db.js";
import { CreateWifi } from "../services/wifiService.js";

async function create(createWifi: CreateWifi) {
    return prisma.wifi.create({ data: createWifi });
}

async function getWifiById(id: number, userId: number) {
    return prisma.wifi.findFirst({
        where: {
            id,
            userId: {
                equals: userId
            }
        }
    });
}

async function getAllWifiOfUser(id: number) {
    return prisma.wifi.findMany({
        where: {
            userId: {
                equals: id
            }
        }
    });
}

async function deleteWifi(id: number) {
    return prisma.wifi.delete({
        where: { id }
    });
}

const wifiRepository = {
    create,
    getWifiById,
    getAllWifiOfUser,
    deleteWifi
};

export default wifiRepository;