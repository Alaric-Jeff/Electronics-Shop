import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import logger
 from "../../utils/logger.js";
import { log } from "console";
const prisma = new PrismaClient();

async function Login(email: string, password: string){

    try{
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if(!user){
            logger.error("User not found:", email);
            throw new Error("User not found");  
        }

        return;

    }catch(error: any){
        logger.error("Login error:", error);
        throw new Error(error.message);
    }
};

export default Login;

