import { Router } from 'express';
import contactController from '../controllers/ContactController';

const routes = Router();

routes.get('/', contactController.index);
routes.post('/register', contactController.register);
routes.get('/editar/:id', contactController.editPage);
routes.post('/edit/:id', contactController.edit);
routes.delete('/delete', contactController.delete);

export default routes;
