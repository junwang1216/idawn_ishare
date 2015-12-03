var MysqlSupport = require("../database/connections/mysql_support");
var simplePool = MysqlSupport.getConnection;

var repository = function () {}

repository.prototype.test = function (command, callback) {
    /* 组装sql语句*/
    var sql = "select * from articles where 1=1";
    /* 获取连接进行查询操作 */
    var connection = simplePool.newConnect();
    connection.query(sql, function (err, rows) {
        if (err) {
            console.log(err);
            connection.end();
            throw err;
        }
        callback(rows);
    });
    connection.end();
}

module.exports = new repository();