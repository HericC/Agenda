import { Request, Response } from 'express';
import { AuthControllerProtocol } from '../interfaces/controllersProtocols';

class AuthController implements AuthControllerProtocol {
    index(req: Request, res: Response): void {
        res.render('login');
    }

    register(req: Request, res: Response): void {
        res.json({ url: 'register', ...req.body });
    }

    login(req: Request, res: Response): void {
        res.json({ url: 'login', ...req.body });
    }

    logout(req: Request, res: Response): void {
        res.send('ola mundo');
    }
}

export default new AuthController();
