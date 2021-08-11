import { Request, Response } from 'express';

export interface ControllerProtocol {
    index(req: Request, res: Response): Promise<Response | void>;
}

export interface AuthControllerProtocol extends ControllerProtocol {
    register(req: Request, res: Response): Promise<Response | void>;
    login(req: Request, res: Response): Promise<Response | void>;
    logout(req: Request, res: Response): Promise<Response | void>;
}
