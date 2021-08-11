import { Router } from 'express';
import homeController from '../controllers/HomeController';

import Middlewares from '../middlewares/Middlewares';

const routes = Router();

routes.get('/', homeController.index);
routes.get('/login', Middlewares.unlogged, homeController.login);

export default routes;
