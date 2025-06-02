import { PrismaClient } from "@prisma/client";
import logger from "../../utils/logger.js";
import UpdatePassword from "../accountServices/UpdatePassword.js";

const prisma = new PrismaClient();

async function updateProduct(updateForm: object, productId: number) {
  try {
    const updatedProduct = await prisma.product.set({
      where: { productId },
      data: {
       updateForm
      }
    });

    

    return updatedProduct;
  } catch (err: unknown) {
    if (err instanceof Error) {
      logger.error("Error in updateProduct:", err.message);
    } else {
      logger.error("Unknown error in updateProduct:", String(err));
    }
    return new Error("Error in updating product service");
  }
}