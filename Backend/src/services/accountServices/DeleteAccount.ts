import { PrismaClient } from "@prisma/client";
import logger from "../../utils/logger.js";

const prisma = new PrismaClient();

async function DeleteAccount(id: number) {
    try{
        const user = await prisma.user.findUnique({
            where: { userId: id }
        });

        if (!user) {
            logger.error("User not found:", id);
            throw new Error("User not found");
        }

        await prisma.user.delete({
            where: { userId: id }
        });

        logger.info("User deleted successfully:", id);
    }catch(err: any){
        logger.error("Error deleting account:", err.message);
        throw new Error("Failed to delete account");

    }
}

export default DeleteAccount;


   