import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function getCategorizedProducts(category: any) {
    try{
        return await prisma.product.findMany({
            where: {
                productCategory: category
            }
        })

    }catch(err: unknown){
       throw err;
    }
};

export default getCategorizedProducts;