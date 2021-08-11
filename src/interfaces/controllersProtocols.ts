import { Request, Response } from 'express';

export interface ControllerProtocol {
    index(req: Request, res: Response): Promise<void>;
}

export interface AuthControllerProtocol extends ControllerProtocol {
    register(req: Request, res: Response): Promise<void>;
    login(req: Request, res: Response): Promise<void>;
    logout(req: Request, res: Response): Promise<void>;
}
