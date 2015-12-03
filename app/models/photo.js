var _ = require("lodash");

var db_photo = require("../database/db_photo");

function Photo() {}

Photo.getAlbums = function (conditions, callback) {
    db_photo.getAlbums(conditions, function (err, data) {
        if (err) {
            return callback(err);
        }
        
        _.forEach(data, function (photo, i) {
            photo.album_name = photo.uuid;
            photo.album_title = photo.title;
            photo.album_cover = photo.cover;
            photo.album_notes = photo.notes;
            photo.album_date = photo.create_date.format('yyyy-MM-dd');
        });
        return callback(null, data);
    });
};

module.exports = Photo;
