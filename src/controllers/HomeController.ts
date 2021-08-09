import { Request, Response } from 'express';
import { ControllerProtocol } from '../interfaces/controllersProtocols';

class HomeController implements ControllerProtocol {
    index(req: Request, res: Response): void {
        res.render('index');
    }
}

export default new HomeController();
