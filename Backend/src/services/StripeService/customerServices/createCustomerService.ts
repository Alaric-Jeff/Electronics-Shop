import stripe from "../../../config/stripe.js";
import logger from "../../../utils/logger.js";

interface CustomerSchema{
    customerName: string,
    payment_method: string,
    email: string
    metadata?: {
        userId?: string,
        address?: string,
        contactNumber?: number,
        
    };
}

async function createCustomerService({customerName, payment_method, email, metadata = {}}: CustomerSchema){

    if(!customerName || !payment_method || !email || !metadata.userId || ! metadata.address || !metadata.contactNumber){
        logger.debug(`recieve fields: customer name: ${customerName}, payment method id: ${payment_method}, email: ${email}, user id: ${metadata.userId}, 
            adress: ${metadata.address}, contact number: ${metadata.contactNumber}
            `)
            throw new Error("Required fields missing in the create customer service")
    }

    try{
         await stripe.customers.create({
            name: customerName,
            payment_method: payment_method,
            email: email,
            metadata
        })

        logger.debug(`Successfully creating customer in service`)
    }catch(err: unknown){ 
        if(err instanceof Error){
            logger.error(`Error in creating customer in service, error: ${err.message}`)
        }else{
            logger.error(`Unknown error occured: ${err}`)
        }
        throw err;
    }
}

export default createCustomerService;