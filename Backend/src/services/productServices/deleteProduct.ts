import { PrismaClient } from "@prisma/client";
import logger from "../../utils/logger.js";
const prisma = new PrismaClient();

async function deleteProducts(ids: number[]) {
  try {
    const { count } = await prisma.product.deleteMany({
      where: {
        productId: { in: ids }
      }
    });

    logger.info("Products deleted successfully", { deletedCount: count, ids });
    return { deletedCount: count };
  } catch (err: unknown) {
    if (err instanceof Error) {
      logger.error("Error in deleteProducts:", err.message);
    } else {
      logger.error("Unknown error in deleteProducts:", String(err));
    }
    return new Error("Error in deleting products service");
  }
}


export default deleteProducts;