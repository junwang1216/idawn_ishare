var controllers;
var path = require('path');

var helpers = require('../helpers');

var Photo = require('../models/photo');

exports.render_index = function (req, res, next) {
    var conds = helpers.getRequestParams(req);

    Photo.getAlbums(conds, function (err, data) {
        console.log(data);
        res.render('photo/index', {
            css: false,
            albums: data
        });
    });
};

exports.render_album = function (req, res, next) {
    var conds = helpers.getRequestParams(req);

        res.render('photo/albums', {
            css: false
        });
};

// ----------------------------------------------------------------

exports.show_photo = function (req, res, next) {
    var conds = helpers.getRequestParams(req);

    res.sendfile(path.join(__dirname, "../database", "collections", conds.id, conds.name));
};
