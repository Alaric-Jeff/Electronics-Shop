import auth from './auth.js'
import paymentRoutes from './paymentRoutes.js'

async function initRoute(app: any) {    
    app.use('/auth', auth);
    app.use('/payments', paymentRoutes);
}   

export default initRoute;