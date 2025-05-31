import { PrismaClient } from "@prisma/client";
import logger from "../../utils/logger.js";
import bcrypt from "bcryptjs";
import { log } from "console";
const prisma = new PrismaClient();

async function UpdatePassword(userId: number, newPassword: string){
    try{
        const user = await prisma.user.findUnique({
            where: {
                userId: userId
            }
        })

        if(!user){
            logger.error("User not found:", userId);
            throw new Error("User not found");
        }

        await user.update({
            where: {
                userId: userId
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