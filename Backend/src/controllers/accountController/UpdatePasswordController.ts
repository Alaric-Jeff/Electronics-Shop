import UpdatePassword  from "../../services/accountServices/UpdatePassword.js";
import logger from "../../utils/logger.js";
import { Request, Response} from "express";

const UpdatePasswordController = async (req: Request, res: Response) => {
    const{userId} = req.params;
    const { newPassword } = req.body;

    if(!userId || !newPassword){
        logger.error("Invalid request parameters");
        return res.status(400).json({
            success: false,
            message: "Invalid request parameters"
        });
    }

    try{
        await UpdatePassword(parseInt(userId), newPassword);
        logger.info("Password updated successfully for user:", userId);
        return res.status(200).json({
            success: true,
            message: "Password updated successfully"
        })

    }catch(err: any){
        logger.error("Error in UpdatePasswordController:", err.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export default UpdatePasswordController;