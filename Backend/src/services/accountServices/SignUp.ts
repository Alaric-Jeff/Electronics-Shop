import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import logger from "../../utils/logger.js";

// Create a single PrismaClient instance
const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

async function SignUp(email: string, password: string, firstName: string, lastName: string, middleName: string) {
    try {
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            throw new Error("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                firstName,
                lastName,
                middleName
            }
        });
        
    } catch (error: any) {
        logger.error("Signup error:", error);
        throw new Error(error.message);
    }
}

export default SignUp;
