import { PrismaClient } from "@prisma/client";
import logger from "../../utils/logger.js";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function UpdatePassword(userId: number, newPassword: string){
    try{
        const userToUpdate = await prisma.user.findUnique({
            where: {
                userId
            }
        })

        if(!userToUpdate){
            logger.error("User not found:", userId);
            throw new Error("User not found");
        }

        await prisma.user.update({
            where: {
                userId
            },
            data: {
                password: await bcrypt.hash(newPassword, 10)
            }
        })


    }catch(err: any){
        logger.error("Error in UpdatePassword:", err.message);
        return err.message;
    }

}

export default UpdatePassword;