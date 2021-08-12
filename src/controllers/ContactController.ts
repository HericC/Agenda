import { Request, Response } from 'express';

import { ContactControllerProtocol } from '../interfaces/controllersProtocols';

import contact from '../models/Contact';

class ContactController implements ContactControllerProtocol {
    public async index(req: Request, res: Response): Promise<Response | void> {
        return res.render('contact', { contact: {} });
    }

    public async register(req: Request, res: Response): Promise<Response | void> {
        try {
            const body = {
                firstName: req.body.firstNameRegister,
                lastName: req.body.lastNameRegister,
                email: req.body.emailRegister,
                phone: req.body.phoneRegister,
            };

            const result = await contact.register(body);

            if (Array.isArray(result)) {
                req.flash('errors', result);
                return res.redirect('back');
            }

            req.flash('success', 'Contato registrado com sucesso.');
            // eslint-disable-next-line no-underscore-dangle
            return res.redirect(`/contatos/editar/${result._id}`);
        } catch (error) {
            console.error(error);
            return res.redirect('/404');
        }
    }

    public async editPage(req: Request, res: Response): Promise<Response | void> {
        try {
            if (!req.params.id) return res.redirect('/404');

            const result = await contact.db.findById(req.params.id);
            if (!result) return res.redirect('/404');

            return res.render('contact', { contact: result });
        } catch (error) {
            console.error(error);
            return res.redirect('/404');
        }
    }

    public async edit(req: Request, res: Response): Promise<Response | void> {
        try {
            if (!req.params.id) return res.redirect('/404');

            const body = {
                firstName: req.body.firstNameRegister,
                lastName: req.body.lastNameRegister,
                email: req.body.emailRegister,
                phone: req.body.phoneRegister,
            };

            const result = await contact.edit(req.params.id, body);

            if (Array.isArray(result)) {
                req.flash('errors', result);
                return res.redirect('back');
            }

            req.flash('success', 'Contato editado com sucesso.');
            // eslint-disable-next-line no-underscore-dangle
            return res.redirect(`/contatos/editar/${result._id}`);
        } catch (error) {
            console.error(error);
            return res.redirect('/404');
        }
    }

    public async delete(req: Request, res: Response): Promise<Response | void> {
        //
    }
}

export default new ContactController();
