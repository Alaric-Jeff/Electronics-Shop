import { Request, Response } from 'express';
import createPaymentIntent from '../../services/StripeService/createPaymentIntent.js';
import logger from '../../utils/logger.js';

const createPaymentIntentController = async (req: Request, res: Response) => {

    const {amount, currency, paymentMethodTypes, paymentMethodId} = req.body;
    const userId = req.user?.id; 

    if(!amount || !currency || !paymentMethodTypes || !paymentMethodId || isNaN(amount) || amount <= 0) {
        logger.error('Missing required fields in request body');
        return res.status(400).json({
            success: false,
            message: 'Missing required fields'
        });
    }

    if(!userId){
        logger.error('User ID not found in request');
        return res.status(401).json({
            success: false,
            message: 'Unauthorized'
        });
    }

    try {
 
    } catch (error: any) {
        logger.error('Error in createPaymentIntentController:', error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

export default createPaymentIntentController; 