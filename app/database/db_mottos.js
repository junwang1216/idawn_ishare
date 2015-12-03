var MysqlSupport = require("../database/connections/mysql_support");
var simplePool = MysqlSupport.getConnection;

var repository = function () {}

repository.prototype.getMottos = function (conditions, callback) {
    var sql = "select author, content, slider, theme from mottos where 1=1";
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
