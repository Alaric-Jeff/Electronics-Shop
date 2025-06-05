import addProductController from '../controllers/productController/addProductController.js';
import express, { RequestHandler } from 'express';
import { upload } from '../middleware/multer.js';

const router = express.Router();

router 
    .post('/add-product', upload.single('productImage') ,addProductController as unknown as RequestHandler);


export default router;