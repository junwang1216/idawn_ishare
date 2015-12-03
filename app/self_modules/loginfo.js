var monitor = require('../../monitor');
var EventEmitter = require("events").EventEmitter;
var _ = require('lodash');
var config = require('../../config');
var log4js = require('log4js');
var util = require('util');

exports.logger = function(){
    if(!config.outlogs){
        return;
    }
    var type = "cheese", logs = "log里什么也没有", type_num = 0;

    if(arguments.length === 0){
        logs = "log里什么也没有";
    }
    if(arguments.length === 1){
        logs = arguments[0];
    }
    if(arguments.length > 1){
        logs = [], type_num = 0;
        //TODO 有时间写个测试
        switch(arguments[0]){
            case "error":
                type =  arguments[0];
                type_num = 1;

                break;
        }
        _.forEach([].slice.call(arguments, type_num, arguments.length), function(p, n){

            if(_.isObject(p)){
                if(util.isError(p)){
                    logs.push(p.message || p.messages[0]);
                }else{
                    logs.push(JSON.stringify(p));
                }

                return;
            }
            if(_.isArray(p)){
                logs.push(p.join(","));
                return;
            }
            logs.push(p);
        })
        logs = logs.join("|")
    }
    //TODO log需要完善
    //log4js.addAppender(log4js.appenders.file('./logs/trace.log'), 'logger');
    var logger = log4js.getLogger(type);
    logger.trace(logs)
};
/**
 * TODO 没想好呢
 * @param req
 * @returns {string}
 */
exports.logsKey = function(req){
    if(req.logsKey){
        return req.logsKey;
    }
    //防止req出错
    var logsKey = "";
    try{
        var uid = req.session.person ? req.session.person.id : "";
        var begin = req.session.begin || Date.now();
        var orders_begin = req.body.orders_begin || begin;
        logsKey = uid + "_" + orders_begin;
    }catch(e){
        Log.info("ORDERS_ERR","创建logsKey失败", new Error(e));
    }

    return logsKey;
}

exports.info = function(){
    if(!config.outlogs){
        return;
    }
    var type = "cheese", logs = "log里什么也没有", type_num = 0;

    if(arguments.length === 0){
        logs = "log里什么也没有";
    }
    if(arguments.length === 1){
        logs = arguments[0];
    }
    if(arguments.length > 1){
        logs = [], type_num = 0;
        //TODO
        type =  arguments[0];

        _.forEach([].slice.call(arguments, 1, arguments.length), function(p, n){

            if(_.isObject(p)){
                if(util.isError(p)){
                    logs.push(p.message || p.messages[0]);
                }else{
                    logs.push(JSON.stringify(p));
                }

                return;
            }
            if(_.isArray(p)){
                logs.push(p.join(","));
                return;
            }
            logs.push(p);
        })
        //logs.push('总耗时' + (Date.now() - begin) + "ms");
        logs = logs.join("|");

        if("ORDERS_ERR" === type || "error" === type){
            monitor.noticeError(new Error(logs));
        }
    }
    //TODO log需要完善
    //log4js.addAppender(log4js.appenders.file('./logs/trace.log'), 'logger');
    var logger = log4js.getLogger(type);
    logger.trace(logs);


    //monitor.setTransactionName("orders", logs);


}