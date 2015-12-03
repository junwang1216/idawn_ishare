var async = require("async");

var fs_photo = require("../database/fs_photo");
var db_photo = require("../database/db_photo");

function Photo () {}

Photo.queryAlbums = function (conditions, callback) {
    async.parallel({
        /*fs : function (cb) {
            fs_albums.queryAlbums(conditions, function (err, albums) {
                if (err) {
                    return cb(err);
                }

                return cb(null, albums);
            });
        },*/
        db : function (cb) {
            db_albums.queryAlbums(conditions, function (err, albums) {
                if (err) {
                    return cb(err);
                }

                return cb(null, albums);
            });
        }
    }, function (err, result) {
        if (err) {
            return callback(err);
        }

        return callback(null, result.db);
    });
};

Photo.queryAlbumsInfo = function (conditions, callback) {
    fs_albums.queryAlbumsInfo(conditions, function (err, albums) {
        if (err) {
            return callback(err);
        }

        return callback(null, albums);
    });
};

Photo.editAlbumsInfo = function (conditions, callback) {
    if (!!conditions.uuid) {
        fs_albums.updateAlbums(conditions, function (err, result) {
            if (err) {
                return callback(err);
            }

            return callback(null, result);
        });
    } else {
        async.parallel({
            /*fs : function (cb) {
                fs_albums.createAlbums(conditions, function (err, album) {
                    if (err) {
                        return cb(err);
                    }

                    return cb(null, album);
                });
            },*/
            db : function (cb) {
                // 赋值相册其他字段
                conditions.uuid = uuid.v1();
                conditions.createTime = (new Date()).format('yyyy-MM-dd hh:mm:ss');
                conditions.updateTime = (new Date()).format('yyyy-MM-dd hh:mm:ss');
                db_albums.createAlbums(conditions, function (err, album) {
                    if (err) {
                        return cb(err);
                    }

                    return cb(null, album);
                });
            }
        }, function (err, result) {
            if (err) {
                return callback(err);
            }

            return callback(null, result.db);
        });
    }
};

Photo.deleteAlbums = function (conditions, callback) {
    fs_albums.deleteAlbums(conditions, function (err, result) {
        if (err) {
            return callback(err);
        }

        return callback(null, result);
    });
};

module.exports = Photo;
