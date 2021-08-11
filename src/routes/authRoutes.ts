import { Router } from 'express';
import authController from '../controllers/AuthController';
import Middlewares from '../middlewares/Middlewares';

const routes = Router();

routes.post('/register', Middlewares.unlogged, authController.register);
routes.post('/login', Middlewares.unlogged, authController.login);
routes.get('/logout', Middlewares.logged, authController.logout);

export default routes;
