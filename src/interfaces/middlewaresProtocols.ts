import { NextFunction, Request, Response } from 'express';

export interface GlobalMiddlewaresProtocol {
    csrf(req: Request, res: Response, next: NextFunction): Promise<void>;
    error(err: any, req: Request, res: Response, next: NextFunction): Promise<void>;
    messagesErrors(req: Request, res: Response, next: NextFunction): Promise<void>;
    messagesSuccess(req: Request, res: Response, next: NextFunction): Promise<void>;
}
