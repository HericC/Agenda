import { NextFunction, Request, Response } from 'express';
import { GlobalMiddlewaresProtocol } from '../interfaces/middlewaresProtocols';

class GlobalMiddlewares implements GlobalMiddlewaresProtocol {
    csrf(req: Request, res: Response, next: NextFunction): void {
        res.locals.csrfToken = req.csrfToken();
        next();
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error(err: any, req: Request, res: Response, next: NextFunction): void {
        if (err) res.redirect('/404');
        next();
    }
}

export default new GlobalMiddlewares();
