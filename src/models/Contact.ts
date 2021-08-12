import { Schema, model, Model } from 'mongoose';
import validator from 'validator';

import { ContactBodyProtocol, ContactModelProtocol, ContactProtocol } from '../interfaces/modelsProtocols';

class Contact implements ContactProtocol {
    private model: Model<ContactModelProtocol>;

    public constructor() {
        this.model = this.createModel();
    }

    get db(): Model<ContactModelProtocol> {
        return this.model;
    }

    private async check(body: ContactBodyProtocol): Promise<string[]> {
        const errors: string[] = [];

        if (!body.firstName) errors.push('Nome requerido');
        if (!body.email && !body.phone) errors.push('Pelo menos um contato precisa ser enviado: E-mail ou Telefone');
        if (body.email && !validator.isEmail(body.email)) errors.push('E-mail inválido');

        return errors;
    }

    public async register(body: ContactBodyProtocol): Promise<ContactModelProtocol | string[]> {
        const checkResult = await this.check(body);
        if (checkResult.length > 0) return checkResult;
        return this.model.create(body);
    }

    public async edit(id: string, body: ContactBodyProtocol): Promise<ContactModelProtocol | string[]> {
        const checkResult = await this.check(body);
        if (checkResult.length > 0) return checkResult;

        const contact = await this.model.findByIdAndUpdate(id, body, { new: true });
        if (!contact) return ['Contato não existe'];

        return contact;
    }

    public async delete(body: ContactBodyProtocol): Promise<ContactModelProtocol | string[]> {
        const checkResult = await this.check(body);
        if (checkResult.length > 0) return checkResult;
        return checkResult;
    }

    private createModel(): Model<ContactModelProtocol> {
        const schema = new Schema({
            firstName: {
                type: String,
                required: true,
            },
            lastName: {
                type: String,
                required: false,
            },
            email: {
                type: String,
                required: false,
            },
            phone: {
                type: String,
                required: false,
            },
            created_at: {
                type: Date,
                default: Date.now(),
            },
        });

        return model<ContactModelProtocol>('contact', schema);
    }
}

export default new Contact();
