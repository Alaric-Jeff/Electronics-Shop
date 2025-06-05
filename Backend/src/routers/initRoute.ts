import { apiLimiter, authLimiter, passwordResetLimiter } from '../middleware/rateLimiter.js';
import auth from './auth.js'
import paymentRoutes from './paymentRoutes.js'

async function initRoute(app: any) {    
    app.use(apiLimiter);
    
    app.use('/auth/login', authLimiter);
    app.use('/auth/reset-password', passwordResetLimiter);
    
    app.use('/auth', auth);
    app.use('/payments', paymentRoutes);
}   

export default initRoute;