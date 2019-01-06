import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import 'object-assign/index.js';
import { LinkResponseService } from './linkResponse/service';
export { HttpClient } from '@angular/common/http';

export { Map } from 'immutable';
export * from './linkResponse/service';
export * from './rest';

@NgModule({
    imports: [HttpClientModule],
    providers: [LinkResponseService],
    declarations: [],
    exports: [],
})

export class RestModule { }
