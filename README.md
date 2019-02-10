# ng-hateoas-client
Access your rest-resources with well known methods


## Dependencies
* "@angular/*": "6.1.8",
* "immutable": "3.8.2",
* "rxjs": "6.3.2",

## Install && usage
 npm i --save ng-hateoas-client

Add dependencies in  _tsconfig.json_

```json
    "lib" : ["es6", "dom"],
    "baseUrl": ".",
    "paths": {
      "ng-hateoas-client": [
        "./node_modules/ng-hateoas-client/rest"
      ]
    },

```

Import por-ng-rest-component & LinkResponseService  in you app

```ts
@NgModule({
    imports: [ RestModule, ... ],
    providers: [ LinkResponseService, .... ],
```

## Testapp

Wind up this app in you favourite shells Kør opp appen med kommandoene (i to ulike shell) :
* _npm run start_ /\* static node-server providing the  mock-files \*/
* _npm run serve_ /\* bundle and serve the test app on port 4422 \*/

See example [app.component.ts](./src/app.component.ts) to learn how to crate  _Link_ for initial call to server, and how to   parse the response into different domain objects vith help of the _DomainObject_ -class. The test app allso gives  examples on how to use  _get('resource')_-functions on a  _LinkResponse_

## Publish

This client use [semver]( http://semver.org/)


```bash
$npm version [semver-version]
$ git push --tags origin master
```

```bash
$ npm prepublish
// Confirm that there is a  _ng-hateoas-client-*.*.*.tgz_-file ,  with correct  version number
$ cd  dist/ng-hateoas-client 
npm publish 
```