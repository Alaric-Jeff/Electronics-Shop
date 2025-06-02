import { PrismaClient } from "@prisma/client";
import logger from "../../utils/logger.js";
const prisma = new PrismaClient();

async function addProduct(productName: string, productDescription: string, productCategory: string, productStock: number, productPrice: number){
    try{
        await prisma.product.create({
            data: {
                productName: productName,
                productDescription: productDescription,
                productCategory: productCategory,
                productStock: productStock,
                productPrice: productPrice
            }
        })
        return;
        
    }catch(err: unknown){
        if(err instanceof Error) {
            logger.error("Error in addProduct:", err.message);
        }else{
            logger.error("Unknown error in addProduct:", String(err));
        }
        return new Error("Error in adding product service");
    }
}

export default addProduct;  
