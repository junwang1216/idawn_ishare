var _ = require("lodash");

var db_mottos = require("../database/db_mottos");

function Mottos() {}

Mottos.getMottos = function (conditions, callback) {
    db_mottos.getMottos(conditions, function (err, data) {
        if (err) {
            return callback(err);
        }
        
        _.forEach(data, function (motto, i) {
            motto.motto_author = motto.author;
            motto.motto_content = motto.content;
            motto.motto_slider = motto.slider;
            motto.motto_theme = motto.theme || motto.slider;
        });
        return callback(null, data);
    });
};

module.exports = Mottos;
