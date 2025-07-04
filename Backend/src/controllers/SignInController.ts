import { Request, Response } from "express";
import Login from "../services/accountServices/Login.js";
import logger from "../utils/logger.js";
import { generateToken } from "../middleware/authenticate.js";
import { log } from "console";

const LoginController = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        logger.error("Missing cr    edentials", { email });
        return res.status(400).json({
            success: false,
            message: "Email and password are required",
        });
    }

    try {
        const user = await Login(email, password);

        if (!user) {
            logger.error("User not found", { email });
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        logger.info(`User ${user.firstName} logged in successfully`); 

        const payload: {userId: number, email: string} = {
            userId: user.userId,
            email: user.email,
        } 

        const token  = await generateToken(payload);
        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            token: token,
        });
        
    } catch (err: unknown) {
        const error = err as Error;
        logger.error(`Login error: ${error.message}`, { email });

        let statusCode = 500;
        let errMessage = "Internal server error";

        if (error.message === "User not found") {
            statusCode = 404;
            errMessage = "User not found";
        } else if (error.message === "Invalid password") {
            statusCode = 401;
            errMessage = "Invalid password";
        }

        return res.status(statusCode).json({
            success: false,
            message: errMessage,
        });
    }
};

export default LoginController;
