import { Component, Injectable } from '@angular/core';
import { User, IUser } from '../../projects/ng-hateoas-client/src/rest/helpers/user';
import { AppService } from './app.service';
import { ErrorMessageService } from './error.message.service';
import { Observable } from 'rxjs';
import { List } from 'immutable';
import { LinkResponse } from 'projects/ng-hateoas-client/src/rest';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
@Injectable()
export class AppComponent {
    title = 'hateoas-test-app';
    public all: Observable<List<User>> = this.appService.all;
    public linkResponse: Observable<LinkResponse<IUser>> = this.appService.linkResponse;
    public user: Observable<User> = this.appService.user;

    public errorMessage: Observable<string> = this.errorMessageService.errorMessage;

    constructor(private appService: AppService, private errorMessageService: ErrorMessageService) { }
}
