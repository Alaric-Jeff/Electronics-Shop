import { PrismaClient } from "@prisma/client";
import logger from "../../utils/logger.js";
const prisma = new PrismaClient();

async function addProduct(productName: string, productDescription: string, productCategory: string, productStock: number, productPrice: number, productImage: string){
    try{

        const productExists = await prisma.product.findUnique({
            where: {
                productName: productName
            }
        });

        if(productExists){
            logger.error("Product already exists:", productName);
            throw new Error("Product with this name already exists");
        }

        await prisma.product.create({
            data: {
                productName: productName,
                productDescription: productDescription,
                productCategory: productCategory,
                productStock: productStock,
                productPrice: productPrice,
                productImage: productImage
            }
        })
        return;
        
    }catch(err: unknown){
        if(err instanceof Error) {
            logger.error("Error in addProduct:", err.message);
        }else{
            logger.error("Unknown error in addProduct:", String(err));
        }
        throw new Error(String(err));
    }
}

export default addProduct;  
