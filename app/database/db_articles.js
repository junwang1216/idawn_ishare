var MysqlSupport = require("../database/connections/mysql_support");
var simplePool = MysqlSupport.getConnection;

var repository = function () {}

repository.prototype.getArticlesTypes = function (conditions, callback) {
    var sql = "select title, notes, uuid from articles_type where 1=1";
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

repository.prototype.getArticles = function (conditions, callback) {
    var sql = "select uuid, title, content, notes from articles where 1=1";
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

repository.prototype.getArticle = function (conditions, callback) {
    var sql = "select uuid, title, content, notes from articles where uuid=?";
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
