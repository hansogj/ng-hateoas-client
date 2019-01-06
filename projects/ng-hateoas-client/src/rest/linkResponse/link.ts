import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LinkResponse, LinkResponseService } from './';

export interface IContent<T> {
    content: T;
}

export interface Href {
    href: string;
}
export class Link {
    private linkResponseBuilder: LinkResponseService;
    private _timeout: number = 10 * 1000;
    constructor(private http: HttpClient, public url: Href) {
        this.linkResponseBuilder = new LinkResponseService(this.http);
    }

    post<T>(params: Object): Observable<LinkResponse<T>> {
        return this.mapper(this.http.post(this.url.href, params));
    }

    put<T>(value: Object): Observable<LinkResponse<T>> {
        return this.mapper(this.http.put(this.url.href, value));
    }

    delete(): Observable<Object> {
        return this.http.delete(this.url.href);
    }

    get<T>(): Observable<LinkResponse<T>> {
        return this.mapper(this.http.get(this.url.href));
    }

    patch<T>(body: any): Observable<LinkResponse<T>> {
        return this.mapper(this.http.patch(this.url.href, body));
    }

    timeout(timeout: number): Link {
        this._timeout = timeout;
        return this;
    }
    private mapper<T>(response: Observable<Object>): Observable<LinkResponse<T>> {
        return response.timeout(this._timeout)
            // TODO .catch(e => this.http.errorHandler(e, this.url.href))
            .map(responseJson => this.linkResponseBuilder.build(responseJson));
    }
}
