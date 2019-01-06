const port = process.argv.length === 3 ? process.argv.pop() : 9999;
const express = require('express');
var path = require("path");
const app = express();

const baseUrl = '/api/';

function resolvePath(resource) {
    resource = resource.match('json') ? resource : resource + '/index.json';
    return path.join(__dirname, resource);
}

[
    { url: 'user', resolve: 'user' },
    { url: 'user/bill', resolve: 'user/bill.json' },
    { url: 'user/bob', resolve: '/user/bob.json' },
    { url: 'user/all', resolve: '/user/all.json' },
].forEach((mapping) => {
    console.info(`Mapping ${baseUrl + mapping.url} to file ${resolvePath(mapping.resolve).replace(__dirname, '')}`)
    app.use(baseUrl + mapping.url, express.static(resolvePath(mapping.resolve)));
});

app.listen(port, (a, e) => console.log('Express  listening on port ' + port));
