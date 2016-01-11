var MysqlSupport = require("../database/connections/mysql_support");
var simplePool = MysqlSupport.getConnection;

var repository = function () {}

repository.prototype.getTwitters = function (conditions, callback) {
    var sql = "select title, content, date from twitter where 1=1 order by date desc";
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

module.exports = new repository();

