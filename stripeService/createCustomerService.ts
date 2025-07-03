import stripe from "../Backend/src/config/stripe.js";
import logger from "../Backend/src/utils/logger.js";

interface CreateCustomerParams {
    email: string;
    customerId?: string;
    userId: number
}

async function createCustomerService(email: string, customerId: string | undefined, userId: number) {
    try {
        const customerData: CreateCustomerParams = {
            email,
            customerId,
            userId
        };

        const customer = await stripe.customers.create({
            email: customerData.email,
            metadata: {
                userId: customerData.userId.toString() 
            }
        });

        return {
            customerId: customer.id,
        };
    } catch (error: any) {
        logger.error('Error creating Stripe customer:', error);
        throw new Error(error.message);
    }

}