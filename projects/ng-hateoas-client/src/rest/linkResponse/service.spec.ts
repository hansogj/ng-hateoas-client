import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import { userLinksMock, userListeMock, userMock, testProviders } from '../helpers/';
import { IUser } from '../helpers/user';
import { IContent, LinkResponse, LinkResponseService } from './service';

describe('LinkResponseService', () => {
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

    it('service is defined', () => expect(linkResponseService).toBeDefined());
    it('service has defined build method', () => expect(linkResponseService.build).toEqual(jasmine.any(Function)));

    describe('model', () => {
        let response: LinkResponse<IUser>;
        beforeEach(() => response = linkResponseService.build(userMock));

        it('links is defined ', () => expect(response.links).toBeDefined());
        it('links contains excpected numbers of sub elements ', () => expect(response.links.size).toEqual(userLinksMock.length));

        it('links contains Link: self', () => expect(response.links.get('self').constructor.name).toEqual('Link'));
        it('links contains Link: next', () => expect(response.links.get('next').constructor.name).toEqual('Link'));
        it('links contains self with url ', () => expect(response.links.get('self').url.href).toEqual(userMock['_links'].self.href));
        it('links contains next with url', () => expect(response.links.get('next').url.href).toEqual(userMock['_links'].next.href));

        it('link has recursive inherited http-service', () => expect(response.links.get('next')['http']).toEqual(http));

        it('value is defined ', () => expect(response.value).toBeDefined());
        it('value contains domain-object ', () => expect(response.value.constructor.name).toEqual('Object'));
        it('value don\'t contain _links ', () => expect(response.value['_links']).not.toBeDefined());
        it('value has user defined', () => expect(response.value.id).toEqual(userMock['id']));
        it('value has user defined', () => expect(response.value.name).toEqual(userMock['name']));
    });

    describe('content model', () => { // content er liste over elementer
        let response: LinkResponse<IContent<IUser[]>>;
        beforeEach(() => response = linkResponseService.build(userListeMock));

        it('value is defined ', () => expect(response.value).toBeDefined());
        it('value contains ikke lenker ', () => expect(response.value['_links']).not.toBeDefined());
        it('content is defined ', () => expect(response.value.content).toBeDefined());
        it('content contains liste over domain-object ', () => expect(response.value.content.constructor.name).toEqual('Array'));

        it('content has 2 user defined', () => expect(response.value.content.length).toEqual(2));
        it('content has 2 user with rett name', () => expect(response.value.content[0].id).toEqual(userListeMock.content[0].id));
        it('content has 2 user with rett name', () => expect(response.value.content[1].id).toEqual(userListeMock.content[1].id));
    });
});
