import { Router } from 'express';
import homeController from '../controllers/HomeController';
import authController from '../controllers/AuthController';

const routes = Router();

routes.get('/404', (req, res) => {
    res.render('404');
});

routes.get('/', homeController.index);
routes.get('/login', authController.index);

export default routes;
