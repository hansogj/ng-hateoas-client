import { Injectable } from '@angular/core';
import { List } from 'immutable';
import { Href, HttpClient, IContent, Link, LinkResponse } from 'projects/ng-hateoas-client/src/rest';
import { User, IUser } from 'projects/ng-hateoas-client/src/rest/helpers/user';
import { BehaviorSubject } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';

@Injectable()
export class AppService {

    public bill: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    public all: BehaviorSubject<any> = new BehaviorSubject<any>(List([]));
    public user: BehaviorSubject<User> = new BehaviorSubject<User>(null);

    constructor(private http: HttpClient) {

        this.fetchUsers();
        this.fetchNonExcistingUser();
    }

    fetchUsers() {
        const meLink: Link = new Link(this.http, { href: `/api/user/bill` } as Href);
        meLink.get()
            .pipe(flatMap((json: LinkResponse<IUser>) => {
                this.bill.next(json.value);
                const user: User = new User(json.links, json.value);
                this.user.next(user);
                return user.get('all'); // see mock/user/bill.json
            }))
            .pipe(map((allUsers: LinkResponse<IContent<IUser[]>>) => {
                this.all.next(allUsers.value);
                return List(allUsers.value.content
                    .map((bru: IUser) => new User(null, bru)));
            }))
            .subscribe((userListe: List<User>) => this.all.next(userListe));

    }

    fetchNonExcistingUser() {
        const failngLink: Link = new Link(this.http, { href: `/api/not/excisting` } as Href);
        failngLink.get().subscribe((response) => { console.log(response); }, (error) => { console.log(error); });
    }
}
