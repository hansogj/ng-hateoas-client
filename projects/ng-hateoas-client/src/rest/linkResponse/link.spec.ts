import { HttpClient } from '@angular/common/http';
import { getTestBed, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { userLinksMock, userMock } from '../helpers';
import { Href, Link } from './service';

describe('Link', () => {
    const url: Href = { href: 'take/me/anywhere' };
    let http: HttpClient;
    let link: Link;
    let get: jasmine.Spy;

    beforeEach(() => {
        get = jasmine.createSpy('get').and.returnValue(new BehaviorSubject(userMock));

        const HttpMock = {
            provide: HttpClient, useFactory: () => {
                return { get };
            },
        };

        TestBed.configureTestingModule({ providers: [HttpMock] });
    });

    beforeEach(() => {
        http = getTestBed().get(HttpClient);
        link = new Link(http, url);
    });

    it('link is defined', () => expect(link).toBeDefined());
    it('link has post method', () => expect(link.post).toEqual(jasmine.any(Function)));
    it('link has get method', () => expect(link.get).toEqual(jasmine.any(Function)));
    it('link has url', () => expect(link.url).toEqual(url));

    describe('server call', () => {
        beforeEach(() => link.get());
        it('should call server ', () => expect(get).toHaveBeenCalledTimes(1));
        it('should call with self ', () => expect(get).toHaveBeenCalledWith(url.href));

        // post
        // ...
    });

    const args = (spion: jasmine.Spy) => spion.calls.argsFor(0).shift();

    describe('subscriber ', () => {
        let subscriber: jasmine.Spy;
        beforeEach(() => {
            subscriber = jasmine.createSpy('subscribe');
            link.get().subscribe(subscriber);
        });
        beforeEach((done: any) => done());

        it('subscriber is called', () => expect(subscriber).toHaveBeenCalledTimes(1));
        it('getLinkResponse as argument ', () => expect(args(subscriber).constructor.name).toEqual('LinkResponse'));
        it('linkRespons has links', () => expect(args(subscriber).links.size).toEqual(userLinksMock.length));
        it('linkRespons has value', () => expect(args(subscriber).value).toEqual(jasmine.any(Object)));
        it('catches that subscribed is reset', () => expect(subscriber).toHaveBeenCalledTimes(1));

        // post
        // ...
    });
});
