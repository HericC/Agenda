import { NextFunction, Request, Response } from 'express';

export interface GlobalMiddlewaresProtocol {
    csrf(req: Request, res: Response, next: NextFunction): void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error(err: any, req: Request, res: Response, next: NextFunction): void;
}
