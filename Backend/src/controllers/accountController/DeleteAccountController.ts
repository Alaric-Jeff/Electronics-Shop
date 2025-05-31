import DeleteAccount from "../../services/AccountLogics/DeleteAccount.js";
import logger from "../../utils/logger.js";
import { Request, Response } from "express";

const DeleteAccountController = async (req: Request, res: Response) => {

    const {userId } = req.params;

    if(!userId){
        logger.error("User ID is missing");

        return res.status(400).json({
            success: false,
            error: "User ID is required"
        });
    }   

    try{
        await DeleteAccount(parseInt(userId));
        logger.info("User deleted successfully:", userId);

        return res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });
    }catch(err: any){
        logger.error("Error in DeleteAccountController:", err.message);
        const statusCode = err.message === "User not found" ? 404 : 500;
        const errMessage = err.message === "User not found" ? "User not found" : "Internal server error";
        return res.status(statusCode).json({
            success: false,
            error: errMessage
        });
    }
}

export default DeleteAccountController; 