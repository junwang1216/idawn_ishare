var fs = require("fs");
var path = require("path");

var _ = require("lodash");

var collectionsPath = path.join(__dirname, "collections");

function Photo() {};

Photo.prototype.getPhotoList = function (name) {
    var albumPath = path.join(collectionsPath, name);
    var photos = fs.readdirSync(albumPath);
    var ret = [];

    _.forEach(photos, function (photo, i) {
        var photoPath = path.join(albumPath, photo);
        var status = fs.lstatSync(photoPath);

        if (status.isFile()) {
            ret.push(name + "/" + photo);
        }
        else if (status.isDirectory()) {}
        else {
            throw "Read Dir, Unknown";
        }
    });

    return ret;
};

module.exports = new Photo();
