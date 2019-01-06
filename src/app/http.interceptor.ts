import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ErrorMessageService } from './error.message.service';

@Injectable()
export class InterceptedHttp implements HttpInterceptor {

    constructor(private errorMessageService: ErrorMessageService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const clonedRequest = req.clone({ headers: req.headers.set('X-CustomAuthHeader', 'void') });

        console.log('new headers', clonedRequest.headers.keys());
        return next.handle(clonedRequest)
            .pipe(tap(
                (event: HttpEvent<any>) => this.successHandler(event),
                (error: any) => this.errorHandler(error)));
    }

    private errorHandler(error: any) {
        console.error('interceptor interrupted failingcall', error);
        this.errorMessageService.warn(`Wops - something went wrong, ${error.url}   ${error.message}`);
        throw error;
    }

    private successHandler(event: HttpEvent<any>) {
        /* do whatever */
        return event;
    }
}
