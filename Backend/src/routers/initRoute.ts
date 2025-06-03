import auth from './auth.js'

async function initRoute(app: any) {    
    app.use('/auth', auth);
}   

export default initRoute;