import addProduct from "../../services/productServices/addProduct.js";
import { Response, Request } from "express";
import logger from "../../utils/logger.js";
import { log } from "console";

const addProductController = async (req: Request, res: Response) => {
    const {
        productName,
        productCategory,
        productDescription,
        productStock,
        productPrice
    } = req.body;

    const productImage = req.file?.filename || 'default-no-image.png';

    if (!productName || !productCategory || !productStock || !productPrice) {
        logger.error("Missing required fields in request body");
        return res.status(400).json({
            success: false,
            message: "Missing required fields in request body"
        });
    }

    try {
        await addProduct(productName, productCategory, productDescription, productStock, productPrice, productImage);
        logger.info("Product added successfully:", productName);
        return res.status(200).json({
            success: true,
            message: "Product added successfully"
        });

    } catch (err: unknown) {
        const statusCode = err instanceof Error && err.message === "Product with this name already exists" ? 409 : 500;

        if (err instanceof Error) {
            logger.error("Error in addProductController:", err.message);
        } else {
            logger.error("Unknown error in addProductController:", String(err));
        }

        return res.status(statusCode).json({
            success: false,
            message: err instanceof Error ? err.message : "Error in adding product"
        });
    }
};


export default addProductController;