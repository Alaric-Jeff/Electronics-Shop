import { log } from "console";
import Login from "../services/AccountLogics/Login.js";
import logger from "../utils/logger.js";

const LoginController = async (req: any, res: any) => {
    const {email, password} = req.body;

    if(!email || !password){
        logger.error("Email or password is missing");

        return res.status(400).json({
            success: false,
            error: "Email and password are required"
        });
    }

    try{
        await Login(email, password);
        logger.info("User logged in successfully:", email);
        
        return res.status(200).json({
            success: true,
            message: "User logged in successfully"
        })
    }catch(err: any){
        logger.error("Login error:", err.message);

        const statusCode = err.message === "User not found" ? 404 : 500;
        const errMessage = err.message === "User not found" ? "User not found" : "Internal server error";
        return res.status(statusCode).json({
            error: errMessage,
            success: false,
        })
    }

};

export default LoginController; 