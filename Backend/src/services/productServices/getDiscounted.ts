import { PrismaClient } from "@prisma/client";
import logger from "../../utils/logger.js";
const prisma = new PrismaClient();

async function getDiscountedProduct(){
    try{
        return await prisma.product.findMany({
            where: {
                productDiscounted: true
            }
        })
    }catch(err: unknown){
        throw err;
    }
};

export default getDiscountedProduct;