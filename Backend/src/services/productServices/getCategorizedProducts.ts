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
        if (err instanceof Error) {
            console.error("Error in getCategorizedProducts:", err.message);
        } else {
            console.error("An unknown error occurred in getCategorizedProducts");
        }
        return new Error("Error in getting categorized products");
    }
};

export default getCategorizedProducts;