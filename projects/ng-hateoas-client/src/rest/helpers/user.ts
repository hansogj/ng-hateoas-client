import { Map } from 'immutable';
import { Link } from '../linkResponse/service';
import { DomainObject } from '../rest';

export interface IUser {
    id: string;
    name: string;
}

export class User extends DomainObject<IUser> implements IUser {
    public id: string;
    public name: string;
    constructor(links: Map<string, Link>, user: IUser) {
        super(links, user);
    }
}
