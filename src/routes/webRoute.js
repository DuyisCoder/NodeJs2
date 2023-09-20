import express from 'express'
import homeController from '../controllers/homeController';
const router = express.Router();


const initRoutes = (app) => {
    router.get('/', homeController.homePage);
    router.get('/about', homeController.aboutPage);
    router.get('/detail/user/:id', homeController.detailUser);
    router.get('/pageCreate',homeController.createPage);
    router.post('/create-user',homeController.createUser);
    return app.use('/', router);
}

export default initRoutes;