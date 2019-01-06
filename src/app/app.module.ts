import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LinkResponseService, RestModule } from '../../projects/ng-hateoas-client/src/rest';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { ErrorMessageService } from './error.message.service';
import { InterceptedHttp } from './http.interceptor';

const HttpProvider: Provider = {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptedHttp, multi: true,
};

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, RestModule],
    providers: [HttpProvider, LinkResponseService, AppService, ErrorMessageService],
    bootstrap: [AppComponent],
})
export class AppModule { }
