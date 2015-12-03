#!/usr/bin/env node

var fs = require('fs');

//var debug = require('debug')('admin');
var app = require('../app');
var quotes = require('./quotes');

var config = require('../config');

app.set('port', process.env.PORT || config.application.port);

var server = app.listen(app.get('port'), function () {
    //debug('Express server listening on port ' + server.address().port);
    console.log('Express server listening on port ' + server.address().port);

    process.stdout.write(fs.readFileSync(__dirname + "/dredd.txt", "utf-8"));
    quotes.random();
});
