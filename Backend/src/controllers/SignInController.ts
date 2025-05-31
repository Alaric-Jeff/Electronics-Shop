import { Request, Response } from "express";
import Login from "../services/AccountLogics/Login.js";
import logger from "../utils/logger.js";

const LoginController = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        logger.error("Missing credentials", { email });
        return res.status(400).json({
            success: false,
            message: "Email and password are required",
        });
    }

    try {
        await Login(email, password);
        logger.info("User logged in successfully", { email });

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
        });
    } catch (err: unknown) {
        const error = err as Error;
        logger.error("Login error", { error: error.message });

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
