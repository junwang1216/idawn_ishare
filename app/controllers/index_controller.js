var controllers;
var path = require('path');
var _ = require('lodash');
var async = require('async');

var helpers = require('../helpers');

var Mottos = require('../models/mottos');
var Articles = require('../models/articles');

exports.render_index = function (req, res, next) {
    async.parallel({
        mottos: function (cb) {
            Mottos.getMottos(null, function (err, mottos) {
                if (err) {
                    return cb(err);
                }

                cb(null, mottos);
            });
        },
        articles_types: function (cb) {
            Articles.getArticlesTypes(null, function (err, data) {
                var types = [];

                if (err) {
                    return cb(err);
                }

                _.forEach(data, function (type, i) {
                    var index = Math.floor(i / 3);

                    if (types[index] && types[index].length) {
                        types[index].push(type);
                    } else {
                        types[index] = [type];
                    }
                });

                cb(null, types);
            });
        }
    }, function (err, results) {
        if (err) {
            return next();
        }

        res.render('index/index', {
            css: "index",
            mottos: results.mottos,
            articles_types: results.articles_types
        });
    });
};

// ----------------------------------------------------------------

exports.show_motto = function (req, res, next) {
    var conds = helpers.getRequestParams(req);

    res.sendfile(path.join(__dirname, "../database", "mottos", conds.name));
};

exports.show_image = function (req, res, next) {
    var conds = helpers.getRequestParams(req);

    res.sendfile(path.join(__dirname, "../database", "collections", conds.uuid, conds.name));
};
