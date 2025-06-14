import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function getCategorizedProducts(category: string) {
    try{
        const products = await prisma.product.findMany({
            where: {
                productCategory: category
            }
        })

        return products;
    }catch(err: unknown){
       throw err;
    }
};

export default getCategorizedProducts;