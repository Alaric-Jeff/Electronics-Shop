"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stripe_js_1 = __importDefault(require("../Backend/src/config/stripe.js"));
const logger_js_1 = __importDefault(require("../Backend/src/utils/logger.js"));
async function processPayment({ paymentIntentId }) {
    try {
        const paymentIntent = await stripe_js_1.default.paymentIntents.confirm(paymentIntentId);
        return {
            success: true,
            paymentIntent,
            status: paymentIntent.status
        };
    }
    catch (error) {
        logger_js_1.default.error('Error processing payment:', error);
        throw new Error(error.message);
    }
}
exports.default = processPayment;
