var controllers;
var _ = require('lodash');

var db_articles = require('../database/db_articles');

function Articles() {}

Articles.getArticlesTypes = function (conditions, callback) {
    db_articles.getArticlesTypes(conditions, function (err, data) {
        if (err) {
            return callback(err);
        }
        
        _.forEach(data, function (type, i) {
            type.type_id = type.uuid;
            type.type_title = type.title;
            type.type_notes = type.notes;
        });

        return callback(null, data);
    });
}

Articles.getArticles = function (conditions, callback) {
    db_articles.getArticles(conditions, function (err, data) {
        if (err) {
            return callback(err);
        }
        
        _.forEach(data, function (article, i) {
            article.article_id = article.uuid;
            article.article_title = article.title;
            article.article_content = article.content;
            article.article_notes = article.notes;
        });
        return callback(null, data);
    });
}

Articles.getArticle = function (conditions, callback) {
    db_articles.getArticle(conditions, function (err, data) {
        if (err) {
            return callback(err);
        }
        
        return callback(null, data[0]);
    });
}

module.exports = Articles;