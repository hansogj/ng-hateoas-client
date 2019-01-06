import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core';
import { LinkResponseService } from '../linkResponse/service';
import { TestInterceptedHttp } from './test.http.interceptor';
declare function require(path: string): string;

const HttpProvider: Provider = {
    provide: HTTP_INTERCEPTORS,
    useClass: TestInterceptedHttp, multi: true,
};

export const testProviders: any[] = [HttpProvider, LinkResponseService] ;
export const userMock: any = require('./user.json');
export const userListeMock: any = require('./user.list.json');
export const userLinksMock: string[] = Object.keys(userMock['_links']);
