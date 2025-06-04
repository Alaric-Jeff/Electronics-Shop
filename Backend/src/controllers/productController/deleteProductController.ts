import deleteProducts from "../../services/productServices/deleteProduct.js";
import logger from "../../utils/logger.js";
import { Response, Request } from "express";

const deleteProductController = async (req: Request, res: Response) => {
    const{ids} = req.body;

    if(!ids || !Array.isArray(ids) || ids.length === 0){
        return res.status(400).json({
            success: false,
            message: "Invalid request, ids are required"
        });
    }

    try{
        await deleteProducts(ids);
        return res.status(200).json({
            success: true,
            message: "Products deleted successfully"
        })
    }catch(err: unknown){
        if(err instanceof Error) {
            logger.error("Error in deleteProductController:", err.message);
        }else{
            logger.error("Unknown error in deleteProductController:", String(err));
        }
        return res.status(500).json({
            success: false,
            message: "Error in deleting product"
        });
    }
}

export default deleteProductController;