import { Schema, model, Model } from 'mongoose';
import validator from 'validator';
import bcryptjs from 'bcryptjs';

import { userBodyProtocol, userModelProtocol, userProtocol } from '../interfaces/modelsProtocols';

class User implements userProtocol {
    private model: Model<userModelProtocol>;

    public constructor() {
        this.model = this.createModel();
    }

    get db(): Model<userModelProtocol> {
        return this.model;
    }

    private async check(body: userBodyProtocol): Promise<string[]> {
        const errors: string[] = [];

        if (!body.name) errors.push('Nome requerido');
        if (!body.email) errors.push('E-mail requerido');
        if (!body.password) errors.push('Senha requerido');

        if (!validator.isEmail(body.email)) {
            errors.push('E-mail inválido');
        } else {
            const result = await this.userExists(body.email);
            if (result) errors.push(result);
        }

        if (body.password.length < 3 || body.password.length > 50)
            errors.push('A senha precisa ter entre 3 e 50 caracteres');

        return errors;
    }

    public async userExists(email: string): Promise<string> {
        const user = await this.model.findOne({ email });
        if (user) return 'E-mail já existe';
        return '';
    }

    public async register(body: userBodyProtocol): Promise<string[] | userModelProtocol> {
        const checkResult = await this.check(body);
        if (checkResult.length > 0) return checkResult;

        const salt = bcryptjs.genSaltSync();
        // eslint-disable-next-line no-param-reassign
        body.password = bcryptjs.hashSync(body.password, salt);

        return this.model.create(body);
    }

    public async login(body: userBodyProtocol): Promise<string[] | userModelProtocol> {
        const checkResult = await this.check(body);
        if (checkResult.length > 0) return checkResult;
        return this.model.create(body);
    }

    private createModel(): Model<userModelProtocol> {
        const schema = new Schema({
            name: {
                type: String,
                required: true,
            },
            email: {
                type: String,
                required: true,
            },
            password: {
                type: String,
                required: true,
            },
        });

        return model<userModelProtocol>('user', schema);
    }
}

export default new User();
