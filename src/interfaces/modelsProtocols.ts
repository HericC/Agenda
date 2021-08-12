import { Document, Model } from 'mongoose';

export interface UserBodyProtocol {
    name: string;
    email: string;
    password: string;
}

export type UserModelProtocol = UserBodyProtocol & Document;

export interface UserProtocol {
    db: Model<UserModelProtocol>;
    register(body: UserBodyProtocol): Promise<UserModelProtocol | string[]>;
    login(body: UserBodyProtocol): Promise<UserModelProtocol | string[]>;
}

export interface ContactBodyProtocol {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

export type ContactModelProtocol = ContactBodyProtocol & Document;

export interface ContactProtocol {
    db: Model<ContactModelProtocol>;
    register(body: ContactBodyProtocol): Promise<ContactModelProtocol | string[]>;
    edit(id: string, body: ContactBodyProtocol): Promise<ContactModelProtocol | string[]>;
    delete(body: ContactBodyProtocol): Promise<ContactModelProtocol | string[]>;
}
