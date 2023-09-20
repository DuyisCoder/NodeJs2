import express from 'express'
import homeController from '../controllers/homeController';
const router = express.Router();


const initRoutes = (app) => {
    router.get('/', homeController.homePage);
    router.get('/about', homeController.aboutPage);
    router.get('/detail/user/:id', homeController.detailUser);
    return app.use('/', router);
}

export default initRoutes;