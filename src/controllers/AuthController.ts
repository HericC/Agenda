import { Request, Response } from 'express';

import { AuthControllerProtocol } from '../interfaces/controllersProtocols';

import user from '../models/User';

class AuthController implements AuthControllerProtocol {
    public async index(req: Request, res: Response): Promise<void> {
        res.render('login');
    }

    public async register(req: Request, res: Response): Promise<void> {
        try {
            const body = {
                name: req.body.nameRegister,
                email: req.body.emailRegister,
                password: req.body.passwordRegister,
            };

            const result = await user.register(body);

            if (Array.isArray(result)) {
                req.flash('errors', result);
                res.redirect('back');
            }

            req.flash('success', 'Seu usuário foi criado com sucesso');
            res.redirect('back');
        } catch (error) {
            console.error(error);
            res.render('404');
        }
    }

    public async login(req: Request, res: Response): Promise<void> {
        res.json({ url: 'login', ...req.body });
    }

    public async logout(req: Request, res: Response): Promise<void> {
        res.send('ola mundo');
    }
}

export default new AuthController();
