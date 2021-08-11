import { NextFunction, Request, Response } from 'express';
import { GlobalMiddlewaresProtocol } from '../interfaces/middlewaresProtocols';

class GlobalMiddlewares implements GlobalMiddlewaresProtocol {
    public async csrf(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        res.locals.csrfToken = req.csrfToken();
        return next();
    }

    public async error(err: any, req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        if (err) res.redirect('/404');
        return next();
    }

    public async messagesErrors(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        res.locals.errors = req.flash('errors');
        return next();
    }

    public async messagesSuccess(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        res.locals.success = req.flash('success');
        return next();
    }

    public async userSession(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        res.locals.user = {
            name: req.session.user?.name,
            logged: !!req.session.user,
        };
        return next();
    }
}

export default new GlobalMiddlewares();
