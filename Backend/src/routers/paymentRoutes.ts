import express, { RequestHandler } from 'express';
import createPaymentIntentController from '../controllers/paymentController/createPaymentIntentController.js';
import processPaymentController from '../controllers/paymentController/processPaymentController.js';

const router = express.Router();

router
    .post('/create-payment-intent', createPaymentIntentController as unknown as RequestHandler)
    .post('/process-payment', processPaymentController as unknown as RequestHandler);

export default router; 