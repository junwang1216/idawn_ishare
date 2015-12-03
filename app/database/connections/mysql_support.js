var mysqlConfig = require("../config/mysql_config");
var mysql = require('mysql');

var SimplePool  = null;
var ClusterPool  = null;

var initSimplePool = function () {
    if (SimplePool == undefined || SimplePool == null) {
        SimplePool = mysql.createPool(mysqlConfig.getSimplePoolConfig());
    }
};
var initClusterPool = function () {
    if (ClusterPool == undefined || ClusterPool ==null) {
        var configCluster = mysqlConfig.getClusterPoolConfig();
        ClusterPool = mysql.createPoolCluster(configCluster);

        for (var index in configCluster.pools.configs) {
            ClusterPool.add(configCluster.pools.configs[index].name, configCluster.pools.configs[index].config);
            console.log("++++" + configCluster.pools.configs[index].name + "-->" + JSON.stringify(configCluster.pools.configs[index].config) + "++++");
        }
        //记录那些连接丢失
        ClusterPool.on('remove', function (nodeId) {
            console.log(':::::REMOVED NODE>>> ' + nodeId); // nodeId = SLAVE1
        });
    }
};

var MysqlSupport = function () {
    /**
     *通过普通的连接池获取
     */
    this.getSimplePoolProxy = {
        getConnect : function (callback) {
            return this.getPool().getConnection(callback);
        },
        releaseConnect : function (conn) {
            SimplePool.releaseConnection(conn);
        },
        getPool : function () {
            initSimplePool();
            return SimplePool;
        }
    };

    /**
     *通过Cluster的连接池获取
     */
    this.getClusterPoolProxy = {
        getConnect : function (name, callback) {
            return this.getPool().getConnection(name, callback);
        },
        releaseConnect : function (conn) {
            if (conn && conn != null) {
                ClusterPool.releaseConnection(conn);
            }
        },
        getPool : function () {
            initClusterPool();
            return ClusterPool;
        }
    };

    /**
     * 通过配置文件获取链接,谁获取谁负责关闭
     */
    this.getConnection = {
        newConnect   : function () {
            return mysql.createConnection(mysqlConfig.getConnectionConfig());
        },
        closeConnect : function (conn) {
            if (conn) {
                try {
                    c.destroy();
                } catch(e) {
                    console.log(e);
                }
            };
        }
    };

    /**
     * 需要在  app  server 地方注册关闭 时间处理
     */
    this.onServerShutdown = function () {
        if (SimplePool && SimplePool != null) {
            try {
                SimplePool.end(function (err) {
                    console.log(err);
                    console.log("::::::::::::::::close pool:::::::::::::::::");
                });
                SimplePool = null;
            } catch(e) {
                console.log(e);
            }
        }
        //清空内部连接池
        if (ClusterPool && ClusterPool != null) {
            try {
                ClusterPool.end(function (err) {
                    console.log(err);
                    console.log("::::::::::::::::close cluster pool:::::::::::::::::");
                });
                ClusterPool = null;
            } catch(e) {
                console.log(e);
            }
        }
        console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++");
        console.log("+                                                  +");
        console.log("+                                                  +");
        console.log("+         server   shutdown                        +");
        console.log("+         "+new Date()+"                           +");
        console.log("+                                                  +");
        console.log("+                                                  +");
        console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++");
    }
};

var mysql_support = new MysqlSupport();

module.exports = mysql_support;
module.exports.formatSql = mysql.format;
