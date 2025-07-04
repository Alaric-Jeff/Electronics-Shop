import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import logger
 from "../../utils/logger.js";

const prisma = new PrismaClient();

async function Login(email: string, password: string){

    try{

        const user = await prisma.user.findUnique({
            where: {
                email
            }, select: {
                userId: true,
                email: true,
                firstName: true,
                lastName: true,
                middleName: true,
                password: true
            }
        })


        if(!user){
            logger.error("User not found:", email);
            throw new Error("User not found");  
        }

        const isValidPassword: boolean = await bcrypt.compare(password, user.password);

        if(!isValidPassword){
            logger.error("Invalid password for user:", email);
            throw new Error("Invalid password");
        }
        logger.info(`user found: ${user.email}`); // it is found by why is userId and email undefined? even here the email is undefined
        return user;

    }catch(error: any){
        logger.error("Login error:", error);
        throw new Error(error.message);
    }
};

export default Login;

