import { Map } from 'immutable';
import { Observable } from 'rxjs';
import { Link, LinkResponse } from './linkResponse/service';

export interface RestInterface<T> {
    links: Map<string, Link>;
    next(): Observable<LinkResponse<T>>;
    get(key: string): Observable<LinkResponse<T>>;
}

export const unRest = function (data: Object): Object {
    const clone = Object.assign({}, data);
    delete clone['self'];
    delete clone['links'];
    return clone;
};

export class Rest<T> implements RestInterface<T> {
    private self: Link;
    constructor(public links: Map<string, Link>) {
        this.self = links ? this.links.get('self') : undefined;
    }

    next(): Observable<LinkResponse<any>> {
        return this.get('next');
    }

    get(key: string): Observable<LinkResponse<any>> {
        return this.links.get(key).get();
    }

    post(data: Object): Observable<LinkResponse<T>> {
        return this.self.post(data);
    }

    put(data: Object): Observable<LinkResponse<T>> {
        return this.self.put(unRest(data));
    }

    delete(): Observable<Object> {
        return this.self.delete();
    }

    patch(data: any): Observable<LinkResponse<T>> {
        return this.self.patch(data);
    }

}

export class DomainObject<T> extends Rest<T> {
    constructor(links: Map<string, Link>, jsn: Object = {}) {
        super(links);
        Object.keys(jsn).forEach(key => this[key] = jsn[key]);
    }

}
