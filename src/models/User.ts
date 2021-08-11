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
        if (!validator.isEmail(body.email)) errors.push('E-mail inválido');

        if (body.password.length < 3 || body.password.length > 50)
            errors.push('A senha precisa ter entre 3 e 50 caracteres');

        return errors;
    }

    public async register(body: userBodyProtocol): Promise<userModelProtocol | string[]> {
        const checkResult = await this.check(body);
        if (checkResult.length > 0) return checkResult;

        const user = await this.model.findOne({ email: body.email });
        if (user) return ['E-mail já existe'];

        const salt = bcryptjs.genSaltSync();
        // eslint-disable-next-line no-param-reassign
        body.password = bcryptjs.hashSync(body.password, salt);

        return this.model.create(body);
    }

    public async login(body: userBodyProtocol): Promise<userModelProtocol | string[]> {
        const checkResult = await this.check(body);
        if (checkResult.length > 0) return checkResult;

        const user = await this.model.findOne({ email: body.email });
        if (!user) return ['Usuario não existe'];
        if (!bcryptjs.compareSync(body.password, user.password)) return ['Usuario não existe (senha)'];

        return user;
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
