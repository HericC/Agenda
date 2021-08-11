import { NextFunction, Request, Response } from 'express';
import { GlobalMiddlewaresProtocol } from '../interfaces/middlewaresProtocols';

class GlobalMiddlewares implements GlobalMiddlewaresProtocol {
    public async csrf(req: Request, res: Response, next: NextFunction): Promise<void> {
        res.locals.csrfToken = req.csrfToken();
        next();
    }

    public async error(err: any, req: Request, res: Response, next: NextFunction): Promise<void> {
        if (err) res.redirect('/404');
        next();
    }

    public async messagesErrors(req: Request, res: Response, next: NextFunction): Promise<void> {
        res.locals.errors = req.flash('errors');
        next();
    }

    public async messagesSuccess(req: Request, res: Response, next: NextFunction): Promise<void> {
        res.locals.success = req.flash('success');
        next();
    }
}

export default new GlobalMiddlewares();
