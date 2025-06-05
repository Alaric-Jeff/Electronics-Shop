import { Request, Response } from 'express';
import createPaymentIntent from '../../services/paymentServices/createPaymentIntent.js';
import logger from '../../utils/logger.js';

const createPaymentIntentController = async (req: Request, res: Response) => {
    try {
        const { amount, currency, paymentMethodTypes, metadata } = req.body;

        if (!amount) {
            return res.status(400).json({
                success: false,
                error: 'Amount is required'
            });
        }

        const paymentIntent = await createPaymentIntent({
            amount,
            currency,
            paymentMethodTypes,
            metadata
        });

        return res.status(200).json({
            success: true,
            data: paymentIntent
        });
    } catch (error: any) {
        logger.error('Error in createPaymentIntentController:', error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

export default createPaymentIntentController; 