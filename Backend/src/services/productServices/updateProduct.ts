import { PrismaClient } from "@prisma/client";
import logger from "../../utils/logger.js";
import UpdatePassword from "../accountServices/UpdatePassword.js";

const prisma = new PrismaClient();

async function updateProduct(updateForm: object, productId: number) {
  try {
    await prisma.product.update({
      where: { productId },
      data: {
        ...updateForm
      }
    });

  } catch (err: unknown) {
    throw err;
  }
}


export default updateProduct;