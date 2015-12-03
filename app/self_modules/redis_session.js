var crypto = require('crypto');

var Redis = require('../redis/adapter');
var config = require('../../config');

/**
 * Express MiddleWare
 * usage: put sessions into redis
 **/
exports.redis_session = function(req, res, next){
    // 产生唯一session_id
    var session_id = config.session.secret; //'node_session_id';
    if(!req.cookies[session_id]){

        //        var time = new Date().getTime().toString();
        //        var salt = crypto.randomBytes(16).toString("hex");
        //        var hash = crypto.createHash("md5").update(salt).digest("hex");
        //        sid = SecureRandom.hex(16)
        //        sid.encode!(Encoding::UTF_8)
        var hash = Math.round(2147483647 * Math.random()) + "." + Math.round(new Date().getTime()/1000);
        var exp = new Date();
        exp.setDate(exp.getDate() + config.cookie.expire);

        res.cookie(session_id, hash, {
            domain  : '.zhe800.com',
            expires : exp
        });
        req.cookies[session_id] = hash;
    }

    var redis_cli = new Redis("session");
    //取出Session值
    redis_cli.client("get", req.cookies[session_id], function(err, rst){
        if(!rst){
            req.session = {};
        }else{
            req.session = JSON.parse(rst);
        }

        // 劫持res.end，在返回前更新session
        res._resend = res.end;
        res.end = function(params){
            //调用真正的res.end函数
            res._resend(params);

            //序列化存入Redis
            if(!req.session) req.session = {};
            redis_cli.client("set", req.cookies[session_id], JSON.stringify(req.session), function(err, results){
                if(err){
                    next(err);
                    return;
                }
                redis_cli.client("expire", req.cookies[session_id], 30 * 60, function(err, results){
                    if(err){
                        next(err)
                        return;
                    }
                    //next();
                });
            });
        }
        next();

    });
}
