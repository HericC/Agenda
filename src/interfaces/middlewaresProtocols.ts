import { NextFunction, Request, Response } from 'express';

export interface GlobalMiddlewaresProtocol {
    csrf(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
    error(err: any, req: Request, res: Response, next: NextFunction): Promise<Response | void>;
    messagesErrors(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
    messagesSuccess(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
    userSession(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}

export interface MiddlewaresProtocol {
    logged(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
    unlogged(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}
