import { PrismaClient, ProductCategories } from "@prisma/client";
import logger from "../../utils/logger.js";

const prisma = new PrismaClient();

async function addProduct(
  productName: string,
  productDescription: string,
  productCategory: string,
  productStock: number,
  productPrice: number,
  productImage: string
) {
  try {
    const productExists = await prisma.product.findUnique({
      where: {
        productName: productName,
      },
    });

    if (productExists) {
      logger.error("Product already exists:", productName);
      throw new Error("Product with this name already exists");
    }

    if (!Object.values(ProductCategories).includes(productCategory as ProductCategories)) {
      logger.error("Invalid product category:", productCategory);
      throw new Error("Invalid product category");
    }

    await prisma.product.create({
      data: {
        productName: productName,
        productDescription: productDescription,
        productCategory: productCategory as ProductCategories, 
        productStock: productStock,
        productPrice: productPrice,
        productImage: productImage,
      },
    });

    return;
  } catch (err: unknown) {
    throw err;
  }
}

export default addProduct;
