import { apiLimiter, authLimiter, passwordResetLimiter } from '../middleware/rateLimiter.js';
import auth from './auth.js'
import paymentRoutes from './paymentRoutes.js'
import accountRoutes from './accountRoutes.js';

async function initRoute(app: any) {    
    app.use(apiLimiter);
    //mounting 
    app.use('/auth/login', authLimiter);
    app.use('/account/update-password', passwordResetLimiter);
    
    app.use('/auth', auth);
    app.use('/payments', paymentRoutes);

    app.use('/account', accountRoutes);
}   

export default initRoute;