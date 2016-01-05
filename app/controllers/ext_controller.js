var controllers;
var helpers = require('../helpers');

var _ = require('lodash');

exports.render_list = function (req, res, next) {
    res.render('ext/list', {});
};

exports.render_questions = function (req, res, next) {
    res.render('ext/questions', {});
};
