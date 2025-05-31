import SignUp from "../services/AccountLogics/SignUp.js";
import logger from "../utils/logger.js";
import { Request, Response } from "express";

const SignUpController = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        logger.error("Email or password is missing");

        return res.status(400).json({
            success: false,
            error: "Email and password are required"
        });
    }

    try {
        await SignUp(email, password);

        logger.info("User signed up successfully:", email);
        return res.status(200).json({
            success: true,
            message: "User signed up successfully"
        });

    } catch (err: any) {
        logger.error("Error in SignUpController:", err.message);

        const statusCode = err.message === "User already exists" ? 400 : 500;
        const errMessage = err.message === "User already exists" ? "User already exists" : "Internal server error";
        
        return res.status(statusCode).json({
            success: false,
            error: errMessage
        });
    }
};

export default SignUpController;
