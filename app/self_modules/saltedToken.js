var crypto = require('crypto');

/**
 * 生成安全码
 **/
var salt = crypto.randomBytes(5).toString("hex");
var hash = crypto.createHash("md5").update(salt).digest("hex");
console.log(hash)