'use strict';

var fs = require('fs');
var json_data = fs.readFileSync('./package.json');
var package_json = JSON.parse(json_data);

function getToday() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
    var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();

    return year + "" + month + "" + day;
}

module.exports = {
    application : {
        version     : package_json.version,
        name        : package_json.name,
        title       : "IDAWN",
        subtitle    : "SHARE",
        host        : '', // http://127.0.0.1/
        port        : 18080, //服务启动端口
        email       : "junwang1216@gmail.com",
        author      : "witun",
        keywords    : "html,html5,css,css3,js,requirejs,jquery,seajs,zepto,node",
        description : "在这里有前端技术的学习积累，有互联网的行业前景分析，有个人的生活感悟。"
    },
    session     : {
        name   : '_nsess',
        //生成 node app/self_modules/saltedToken.js
        secret : 'd704d2a708ad6f77e2c882eb90cb2656'
    },
    cookie      : {
        name   : 'session_id',
        expire : 2 * 365
    },
    outlogs     : true,
    outconsole  : {
        adapter : false,
        results : false,
        params  : false
    },
    log4js      : {
        "appenders"      : [
            {"type" : "console"},
            {
                "filename" : "logs/log_" + getToday() + ".log",
                "absolute" : true,
                "type"     : "file"
            }
        ],
        "replaceConsole" : false
    },
    i18n        : {
        locales        : ['zh-CN'],
        defaultLocale  : 'zh-CN',
        objectNotation : true,
        updateFiles    : false,
        directory      : 'i18n', // i18n 翻译文件目录，可以写成其他的。
        extension      : '.json'
    }
}
