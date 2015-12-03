var controllers;
var _ = require('lodash');
var async = require('async');

var helpers = require('../helpers');

var Articles = require('../models/articles');

exports.render_index = function (req, res, next) {
    async.parallel({
        articles: function (cb) {
            Articles.getArticles(null, function (err, data) {
                if (err) {
                    return cb(err);
                }

                cb(null, data);
            });
        },
        articles_types: function (cb) {
            Articles.getArticlesTypes(null, function (err, data) {
                if (err) {
                    return cb(err);
                }

                cb(null, data);
            });
        }
    }, function (err, results) {
        if (err) {
            return next();
        }

        res.render('articles/index', {
            css: "articles",
            articles: results.articles,
            articles_types: results.articles_types
        });
    });
};

exports.render_articles = function (req, res, next) {
    var conds = helpers.getRequestParams(req);

    async.parallel({
        article: function (cb) {
            Articles.getArticle(conds, function (err, data) {
                if (err) {
                    return cb(err);
                }

                cb(null, data);
            });
        },
        articles_types: function (cb) {
            Articles.getArticlesTypes(null, function (err, data) {
                if (err) {
                    return cb(err);
                }

                cb(null, data);
            });
        }
    }, function (err, results) {
        if (err) {
            return next();
        }

        res.render('articles/content', {
            css: "articles",
            article_title: results.article.title,
            article_content: results.article.content,
            articles_types: results.articles_types
        });
    });
};
