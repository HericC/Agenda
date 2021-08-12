import { Request, Response } from 'express';

import { HomeControllerProtocol } from '../interfaces/controllersProtocols';

import contact from '../models/Contact';

class HomeController implements HomeControllerProtocol {
    public async index(req: Request, res: Response): Promise<Response | void> {
        const result = await contact.db.find().sort({ created_at: -1 });
        return res.render('index', { contacts: result });
    }

    public async login(req: Request, res: Response): Promise<Response | void> {
        return res.render('login');
    }
}

export default new HomeController();
