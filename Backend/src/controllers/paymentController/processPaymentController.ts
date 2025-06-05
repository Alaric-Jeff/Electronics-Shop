import { Request, Response } from 'express';
import processPayment from '../../services/paymentServices/processPayment.js';
import logger from '../../utils/logger.js';

const processPaymentController = async (req: Request, res: Response) => {
    try {
        const { paymentIntentId } = req.body;

        if (!paymentIntentId) {
            return res.status(400).json({
                success: false,
                error: 'Payment Intent ID is required'
            });
        }

        const result = await processPayment({ paymentIntentId });

        return res.status(200).json({
            success: true,
            data: result
        });
    } catch (error: any) {
        logger.error('Error in processPaymentController:', error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

export default processPaymentController; 