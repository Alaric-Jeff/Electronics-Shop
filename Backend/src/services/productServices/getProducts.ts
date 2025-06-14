import { PrismaClient } from "@prisma/client";
import logger from "../../utils/logger.js";

const prisma = new PrismaClient();

async function getProducts() {
    try {

        return await prisma.product.findMany();

    } catch (err: unknown) {
        throw err;
    }
}

export default getProducts;