import { Request, Response } from 'express';

export interface ControllerProtocol {
    index(req: Request, res: Response): void;
}

export interface AuthControllerProtocol extends ControllerProtocol {
    register(req: Request, res: Response): void;
    login(req: Request, res: Response): void;
    logout(req: Request, res: Response): void;
}
