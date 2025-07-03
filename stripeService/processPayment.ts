import stripe from '../Backend/src/config/stripe.js';
import logger from '../Backend/src/utils/logger.js';

interface ProcessPaymentParams {
    paymentIntentId: string;
}

async function processPayment({ paymentIntentId }: ProcessPaymentParams) {
    try {
        // Confirm the payment with Stripe
        const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId);

        return {
            success: true,
            paymentIntent,
            status: paymentIntent.status
        };
    } catch (error: any) {
        logger.error('Error processing payment:', error);
        throw new Error(error.message);
    }
}

export default processPayment; 