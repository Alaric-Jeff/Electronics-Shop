import { PrismaClient } from "@prisma/client";
import logger from "../../utils/logger.js";
const prisma = new PrismaClient();

async function deleteProducts(ids: number[]) {
  try {

    const isExisting = await prisma.product.findMany({
      where: {
        productId: { in: ids }
      }

    });

    if (isExisting.length === 0) {
      logger.error("No products found with the provided IDs", { ids });
      return new Error("No products found with the provided IDs");
    }
    const { count } = await prisma.product.deleteMany({
      where: {
        productId: { in: ids }
      }
    });

    logger.info("Products deleted successfully", { deletedCount: count, ids });
    return { deletedCount: count };
  } catch (err: unknown) {
    throw err;
  }
}


export default deleteProducts;