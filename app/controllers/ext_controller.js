var controllers;
var fs = require('fs');

var helpers = require('../helpers');
var Twitter = require('../models/twitter');

exports.render_twitter = function (req, res, next) {
    var conds = helpers.getRequestParams(req);

    Twitter.getTwitters(conds, function (err, data) {
        res.render('ext/twitter', {
            css: "ext_twitter",
            twitter: data
        });
    });
};

exports.render_list = function (req, res, next) {
    res.render('ext/list', {});
};

exports.render_questions = function (req, res, next) {
    var data = require('../json/questions.js');

    res.render('ext/questions', {
        questions : JSON.stringify(data)
    });
};

exports.show_news = function (req, res, next) {
    res.json({
        status: 200,
        data: [{
            title: "测试111",
            note: "测试111测试111测试111测试111测试111"
        }, {
            title: "测试111",
            note: "测试111测试111测试111测试111测试111"
        }, {
            title: "测试111",
            note: "测试111测试111测试111测试111测试111"
        }, {
            title: "测试111",
            note: "测试111测试111测试111测试111测试111"
        }, {
            title: "测试111",
            note: "测试111测试111测试111测试111测试111"
        }, {
            title: "测试111",
            note: "测试111测试111测试111测试111测试111"
        }, {
            title: "测试111",
            note: "测试111测试111测试111测试111测试111"
        }, {
            title: "测试111",
            note: "测试111测试111测试111测试111测试111"
        }, {
            title: "测试111",
            note: "测试111测试111测试111测试111测试111"
        }, {
            title: "测试111",
            note: "测试111测试111测试111测试111测试111"
        }, {
            title: "测试111",
            note: "测试111测试111测试111测试111测试111"
        }, {
            title: "测试111",
            note: "测试111测试111测试111测试111测试111"
        }]
    });
};
