import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { userLinksMock, userMock, testProviders } from './helpers/';
import { User } from './helpers/user';
import { LinkResponse, LinkResponseService } from './linkResponse/service';
 
describe('RestService', () => {
    let linkResponseService: LinkResponseService = null;
    let http: HttpClient;

    beforeEach(() => TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: testProviders,
    }));

    beforeEach(() => {
        linkResponseService = getTestBed().get(LinkResponseService);
        http = getTestBed().get(HttpClient);
    });

    fdescribe('model', () => {
        let user: User;

        beforeEach(() => {
            const response: LinkResponse<User> = linkResponseService.build(userMock);
            user = new User(response.links, (response.value));
        });

        it('is rest object', () => expect(user.links).toBeDefined());
        it('is rest object', () => expect(user.links).toBeDefined());
        it('is rest object', () => expect(user.links.size).toEqual(userLinksMock.length));
        it('is rest object', () => ['next', 'get', 'post', 'delete', 'put'].forEach(fn => expect(typeof user[fn]).toBe('function')));
        it('is domain object (extending rest)', () => expect(user.id).toBeDefined());
        it('is domain object (extending rest)', () => expect(user.name).toBeDefined());

        describe('object as a service', () => {
            let httpGet: jasmine.Spy;
            let httpPost: jasmine.Spy;
            let httpDel: jasmine.Spy;
            let httpPut: jasmine.Spy;
            beforeEach(() => {
                httpGet = spyOn(http, 'get').and.returnValue(Observable.create(null));
                httpPost = spyOn(http, 'post').and.returnValue(Observable.create(null));
                httpDel = spyOn(http, 'delete').and.returnValue(Observable.create(null));
                httpPut = spyOn(http, 'put').and.returnValue(Observable.create(null));

            });

            describe('next', () => {
                beforeEach(() => user.next());
                it('http.get is called', () => expect(httpGet).toHaveBeenCalledTimes(1));
                it('http.get is called with excpected arguments', () => expect(httpGet.calls.mostRecent().args)
                    .toEqual([userMock['_links'].next.href]));
            });

            describe('post', () => {
                const args = { data: '', length: 22 };
                beforeEach(() => user.post(args));
                it('http.post is called', () => expect(httpPost).toHaveBeenCalledTimes(1));
                it('http.post is called with excpected arguments', () => expect(httpPost.calls.mostRecent().args)
                    .toEqual([userMock['_links'].self.href, args]));
            });

            describe('delete', () => {
                beforeEach(() => user.delete());
                it('http.delete is called', () => expect(httpDel).toHaveBeenCalledTimes(1));
                it('http.delete is called with excpected arguments', () => expect(httpDel.calls.mostRecent().args)
                    .toEqual([userMock['_links'].self.href]));
            });
            describe('put', () => {
                beforeEach(() => user.put(user));
                it('http.put is called', () => expect(httpPut).toHaveBeenCalledTimes(1));
                it('http.put is called with excpected arguments', () => expect(httpPut.calls.mostRecent().args)
                    .toEqual([userMock['_links'].self.href, { id: user.id, name: user.name } as User]));
            });
        });
    });
});
