var config = require('../../config');

exports.session_id = function(req, res, next){
    // 产生唯一session_id
    var session_id = 'session_id';
    if(!req.cookies[session_id]){

        var hash = Math.round(2147483647 * Math.random()) + "." + Math.round(new Date().getTime()/1000);
        var exp = new Date();
        exp.setDate(exp.getDate() + config.cookie.expire);

        res.cookie(session_id, hash, {
            domain  : '.zhe800.com',
            expires : exp
        });
        req.cookies[session_id] = hash;
    }
    next();
}