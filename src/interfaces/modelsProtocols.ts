import { Document, Model } from 'mongoose';

export interface userBodyProtocol {
    name: string;
    email: string;
    password: string;
}

export type userModelProtocol = Document & userBodyProtocol;

export interface userProtocol {
    db: Model<userModelProtocol>;
    userExists(email: string): Promise<string>;
    register(body: userBodyProtocol): Promise<string[] | userModelProtocol>;
    login(body: userBodyProtocol): Promise<string[] | userModelProtocol>;
}
