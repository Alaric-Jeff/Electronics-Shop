import addProductController from '../controllers/productController/addProductController.js';
import express, { RequestHandler } from 'express';

const router = express.Router();

router 
    .post('/add-product', addProductController as unknown as RequestHandler);


export default router;