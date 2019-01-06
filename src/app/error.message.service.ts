import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ErrorMessageService {
    public errorMessage: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    constructor() { }

    warn(message: string) {
        this.errorMessage.next(message);
    }
}
