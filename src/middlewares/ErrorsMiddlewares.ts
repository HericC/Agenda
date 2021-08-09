import { NextFunction, Request, Response } from 'express';
import { ErrorsMiddlewaresProtocol } from '../interfaces/middlewaresProtocols';

class ErrorsMiddlewares implements ErrorsMiddlewaresProtocol {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    csrf(err: any, req: Request, res: Response, next: NextFunction): void {
        if (err && err.code === 'EBADCSRFTOKEN') res.redirect('/404');
        next();
    }
}

export default new ErrorsMiddlewares();
