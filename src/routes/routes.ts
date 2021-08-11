import { Router } from 'express';
import homeController from '../controllers/HomeController';
import authController from '../controllers/AuthController';

const routes = Router();
const authRoutes = Router();

routes.get('/404', (req, res) => {
    res.render('404');
});

routes.get('/', homeController.index);
routes.get('/login', authController.index);

authRoutes.post('/register', authController.register);
authRoutes.post('/login', authController.login);
authRoutes.get('/logout', authController.logout);

export { routes, authRoutes };
