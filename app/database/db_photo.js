var MysqlSupport = require("../database/connections/mysql_support");
var simplePool = MysqlSupport.getConnection;

var repository = function () {}

repository.prototype.getAlbums = function (conditions, callback) {
    var sql = "select uuid, title, notes, cover, create_date from albums where 1=1";
    var connection = simplePool.newConnect();

    connection.query(sql, function (err, rows) {
        if (err) {
            connection.end();
            callback(err);
            throw err;
        }
        callback(null, rows);
    });
    connection.end();
};

repository.prototype.getAlbum = function (conditions, callback) {
    var sql = "select uuid, title, notes, cover, create_date from albums where uuid=?";
    var params = [conditions.id];
    var connection = simplePool.newConnect();

    connection.query(sql, params, function (err, rows) {
        if (err) {
            connection.end();
            callback(err);
            throw err;
        }
        callback(null, rows);
    });
    connection.end();
}

module.exports = new repository();
