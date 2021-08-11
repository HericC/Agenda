import { NextFunction, Request, Response } from 'express';
import { MiddlewaresProtocol } from '../interfaces/middlewaresProtocols';

class Middlewares implements MiddlewaresProtocol {
    public async logged(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        if (!req.session.user) return res.redirect('/404');
        return next();
    }

    public async unlogged(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        if (req.session.user) return res.redirect('/404');
        return next();
    }
}

export default new Middlewares();
