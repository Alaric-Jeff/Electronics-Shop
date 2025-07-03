"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stripe_js_1 = __importDefault(require("../Backend/src/config/stripe.js"));
const logger_js_1 = __importDefault(require("../Backend/src/utils/logger.js"));
var supportCurrencies;
(function (supportCurrencies) {
    supportCurrencies[supportCurrencies["PHP"] = 1] = "PHP";
    supportCurrencies[supportCurrencies["USD"] = 50] = "USD";
    supportCurrencies[supportCurrencies["EUR"] = 60] = "EUR";
    supportCurrencies[supportCurrencies["GBP"] = 70] = "GBP";
})(supportCurrencies || (supportCurrencies = {}));
async function createPaymentIntent({ amount, currency = 'php', paymentMethodTypes = ['card'], metadata = {} }) {
    try {
        const paymentIntent = await stripe_js_1.default.paymentIntents.create({
            amount: Math.round(amount * 100),
            currency,
            payment_method_types: paymentMethodTypes,
            metadata
        });
        return {
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id
        };
    }
    catch (error) {
        logger_js_1.default.error('Error creating payment intent:', error);
        throw new Error(error.message);
    }
}
exports.default = createPaymentIntent;
