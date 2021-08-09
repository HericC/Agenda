import { NextFunction, Request, Response } from 'express';

export interface ErrorsMiddlewaresProtocol {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    csrf(err: any, req: Request, res: Response, next: NextFunction): void;
}
