import { Injectable } from '@angular/core';
import { List } from 'immutable';
import { Href, HttpClient, IContent, Link, LinkResponse, LinkResponseService, unRest } from 'projects/ng-hateoas-client/src/rest';
import { User, IUser } from 'projects/ng-hateoas-client/src/rest/helpers/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';

@Injectable()
export class AppService {

    private linkResponseBS: BehaviorSubject<LinkResponse<IUser>> = new BehaviorSubject<LinkResponse<IUser>>(undefined);
    private allBS: BehaviorSubject<List<User>> = new BehaviorSubject<List<User>>(List([]));
    private userBS: BehaviorSubject<User> = new BehaviorSubject<User>(undefined);

    constructor(private http: HttpClient, private linkResponseService: LinkResponseService) {
        this.fetchUsers();
        this.fetchNonExcistingUser();
    }

    get linkResponse(): Observable<LinkResponse<IUser>> {
        return this.linkResponseBS.asObservable();
    }

    get all(): Observable<List<User>> {
        return this.allBS.asObservable();
    }

    get user(): Observable<User> {
        return this.userBS.asObservable();
    }

    private fetchUsers(): void {
        const meLink: Link = new Link(this.http, { href: `/api/user/bill` } as Href);
        meLink.get()
            .pipe(flatMap((response: LinkResponse<IUser>) => {
                this.linkResponseBS.next(response);
                const user: User = new User(response.links, response.value);
                this.userBS.next(user);
                return user.get('all'); // see mock/user/bill.json
            }))
            .pipe(map((allUsers: LinkResponse<IContent<IUser[]>>) => {
                return List(allUsers.value.content
                    .map(bru => this.linkResponseService.build(bru))
                    .map((bru: LinkResponse<IUser>) => new User(bru.links, bru.value)));
            }))
            .subscribe((userListe: List<User>) => this.allBS.next(userListe));

    }

    private fetchNonExcistingUser() {
        const failngLink: Link = new Link(this.http, { href: `/api/not/excisting` } as Href);
        failngLink.get().subscribe((response) => { console.log(response); }, (error) => { console.log(error); });
    }
}
