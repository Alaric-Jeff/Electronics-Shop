import { PrismaClient } from "@prisma/client";
import logger from "../../utils/logger.js";

const prisma = new PrismaClient();

async function getProducts() {
    try {
        const products = await prisma.product.findMany();
        return products;
    } catch (err: unknown) {
        if (err instanceof Error) {
            logger.error("Error in getProducts:", err.message);
        } else {
            logger.error("Unknown error in getProducts:", String(err));
        }
        return new Error("Error in getting products service");
    }
}

export default getProducts;