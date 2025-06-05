import stripe from '../../config/stripe.js';
import logger from '../../utils/logger.js';

interface CreatePaymentIntentParams {
    amount: number;
    currency: string;
    paymentMethodTypes: string[];
    metadata?: {
        orderId?: string;
        userId?: string;
    };
}

async function createPaymentIntent({
    amount,
    currency = 'php',
    paymentMethodTypes = ['card'],
    metadata = {}
}: CreatePaymentIntentParams) {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), 
            currency,
            payment_method_types: paymentMethodTypes,
            metadata
        });

        return {
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id
        };
    } catch (error: any) {
        logger.error('Error creating payment intent:', error);
        throw new Error(error.message);
    }
}

export default createPaymentIntent; 