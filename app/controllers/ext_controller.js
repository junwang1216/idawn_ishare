var controllers;
var fs = require('fs');

var helpers = require('../helpers');

exports.render_list = function (req, res, next) {
    res.render('ext/list', {});
};

exports.render_questions = function (req, res, next) {
    var data = require('../json/questions.js');

    res.render('ext/questions', {
        questions : JSON.stringify(data)
    });
};
