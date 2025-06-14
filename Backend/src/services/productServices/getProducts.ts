import { PrismaClient } from "@prisma/client";
import logger from "../../utils/logger.js";

const prisma = new PrismaClient();

async function getProducts() {
    try {

        return await prisma.product.findMany();
        
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