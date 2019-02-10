import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Map } from 'immutable';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
        return response // .timeout(this._timeout)
            // TODO .catch(e => this.http.errorHandler(e, this.url.href))
            // .map((_response: Response) => _response.json())
            .pipe(map(responseJson => this.linkResponseBuilder.bygg(responseJson)));
    }
}

@Injectable()
export class LinkResponseService {

    constructor(private http: HttpClient) { }

    private genererLinker(linksJSON: Object): Map<string, Link> {
        let linker: Map<string, Link> = Map<string, Link>();
        Object.keys(linksJSON).forEach((rel: string) =>
            linker = linker.set(rel, new Link(this.http, (linksJSON[rel] as Href))));
        return linker;
    }

    // @deplrecated
    bygg<T>(responseJson: Object): LinkResponse<T> {
        return this.build(responseJson);
    }

    build<T>(responseJson: Object): LinkResponse<T> {
        const value: T = Object.assign({}, responseJson) as T;
        delete value['_links'];
        return new LinkResponse<T>(this.genererLinker(responseJson['_links']), value);
    }
}

export class LinkResponse<T> {
    constructor(public links: Map<string, Link>, public value: T) { }
    get(selector: string) {
        return this.value[selector];
    }

    toString() {
        return JSON.stringify(
            {
                links: this.links.entrySeq()
                    .map(([key, val]: any[]) => {
                        const res = {};
                        res[key] = val.url;
                        return res;
                    }).toArray(),
                value: this.value,
            },
            null,
            2);
    }
}
