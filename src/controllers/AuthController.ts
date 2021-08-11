import { Request, Response } from 'express';

import { AuthControllerProtocol } from '../interfaces/controllersProtocols';

import user from '../models/User';

class AuthController implements AuthControllerProtocol {
    public async index(req: Request, res: Response): Promise<Response | void> {
        if (req.session.user) return res.render('404');
        return res.render('login');
    }

    public async register(req: Request, res: Response): Promise<Response | void> {
        try {
            const body = {
                name: req.body.nameRegister,
                email: req.body.emailRegister,
                password: req.body.passwordRegister,
            };

            const result = await user.register(body);

            if (Array.isArray(result)) {
                req.flash('errors', result);
                return res.redirect('back');
            }

            req.flash('success', 'Seu usuário foi criado com sucesso');
            return res.redirect('back');
        } catch (error) {
            console.error(error);
            return res.render('404');
        }
    }

    public async login(req: Request, res: Response): Promise<Response | void> {
        try {
            const body = {
                name: 'null',
                email: req.body.emailLogin,
                password: req.body.passwordLogin,
            };

            const result = await user.login(body);

            if (Array.isArray(result)) {
                req.flash('errors', result);
                return res.redirect('back');
            }

            req.flash('success', 'Entrou no sistema');
            req.session.user = result;

            return res.redirect('/');
        } catch (error) {
            console.error(error);
            return res.render('404');
        }
    }

    public async logout(req: Request, res: Response): Promise<Response | void> {
        req.session.destroy(() => {
            return res.redirect('/login');
        });
    }
}

export default new AuthController();
