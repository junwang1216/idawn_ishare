var controllers;
var helpers = require('../helpers');

var _ = require('lodash');

exports.render_index = function (req, res, next) {
    res.render('about/index', {});
};

/*exports.render_index = function (req, res, next) {
    res.render('about/about_v2', {});
};*/
