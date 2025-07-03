import express, { RequestHandler } from 'express';
import createPaymentIntentController from '../controllers/stripeController/createPaymentIntentController.js';

const router = express.Router();

router
    .post('/create-payment-intent', createPaymentIntentController as unknown as RequestHandler)
export default router; 