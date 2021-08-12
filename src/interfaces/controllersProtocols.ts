import { Request, Response } from 'express';

export interface HomeControllerProtocol {
    index(req: Request, res: Response): Promise<Response | void>;
    login(req: Request, res: Response): Promise<Response | void>;
}

export interface AuthControllerProtocol {
    register(req: Request, res: Response): Promise<Response | void>;
    login(req: Request, res: Response): Promise<Response | void>;
    logout(req: Request, res: Response): Promise<Response | void>;
}

export interface ContactControllerProtocol {
    index(req: Request, res: Response): Promise<Response | void>;
    register(req: Request, res: Response): Promise<Response | void>;
    editPage(req: Request, res: Response): Promise<Response | void>;
    edit(req: Request, res: Response): Promise<Response | void>;
    delete(req: Request, res: Response): Promise<Response | void>;
}
