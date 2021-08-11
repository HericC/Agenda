import { Request, Response } from 'express';
import { HomeControllerProtocol } from '../interfaces/controllersProtocols';

class HomeController implements HomeControllerProtocol {
    public async index(req: Request, res: Response): Promise<Response | void> {
        return res.render('index');
    }

    public async login(req: Request, res: Response): Promise<Response | void> {
        return res.render('login');
    }
}

export default new HomeController();
