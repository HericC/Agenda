import { Request, Response } from 'express';
import { ControllerProtocol } from '../interfaces/controllersProtocols';

class HomeController implements ControllerProtocol {
    public async index(req: Request, res: Response): Promise<void> {
        res.render('index');
    }
}

export default new HomeController();
