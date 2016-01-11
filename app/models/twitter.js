var _ = require("lodash");

var db_twitter = require("../database/db_twitter");

function Twitter() {}

Twitter.getTwitters = function (conditions, callback) {
    db_twitter.getTwitters(conditions, function (err, data) {
        if (err) {
            return callback(err);
        }
        
        _.forEach(data, function (twitter, i) {
            var dateString = (new Date(twitter.date)).format('yyyy-MM-dd hh:mm');

            twitter.twitter_date = dateString.split(" ")[0];
            twitter.twitter_time = dateString.split(" ")[1];
            twitter.twitter_content = twitter.content;
            twitter.twitter_title = twitter.title;
        });
        return callback(null, data);
    });
};

module.exports = Twitter;
