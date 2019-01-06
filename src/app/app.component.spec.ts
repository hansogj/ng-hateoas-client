import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, getTestBed, TestBed } from '@angular/core/testing';
import { User } from 'projects/ng-hateoas-client/src/rest/helpers/user';
import { RestModule } from '../../projects/ng-hateoas-client/src/rest';
import { testProviders } from '../../projects/ng-hateoas-client/src/rest/helpers';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { ErrorMessageService } from './error.message.service';

describe('AppComponent', () => {
    let service: AppService;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RestModule],
            declarations: [AppComponent],
            providers: testProviders.concat([AppService, ErrorMessageService]),
        }).compileComponents();
    }));
    beforeEach(() => service = getTestBed().get(AppService));

    beforeEach(() => service.user.next(new User(null, { name: 'Bon Scott', id: 'BOS001' } as any)));

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
    it(`should have as title 'hateoas-test-app'`, async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual('hateoas-test-app');
    }));
    it('should render title in a .header element', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('.header').textContent).toContain('Bon Scott');
    }));
});
