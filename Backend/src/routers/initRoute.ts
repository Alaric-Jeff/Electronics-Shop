import { apiLimiter, authLimiter, passwordResetLimiter } from '../middleware/rateLimiter.js';
import {authenticateCookie} from '../middleware/authenticate.js';
import auth from './auth.js'
import paymentRoutes from './paymentRoutes.js'
import accountRoutes from './accountRoutes.js';

async function initRoute(app: any) {    
    app.use(apiLimiter); 

    app.use('/auth', authLimiter, auth);
    app.use('/account/update-password', passwordResetLimiter);

    app.use('/payments', authenticateCookie, paymentRoutes);
    app.use('/account', accountRoutes);
}   

export default initRoute;