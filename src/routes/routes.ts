import { Router } from 'express';

const routes = Router();

routes.get('/404', (req, res) => {
    res.render('404');
});

export default routes;
