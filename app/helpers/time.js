var _ = require('lodash');

function Time() {

}

Time.constant = {

}

/**
 * @function:对时间进行格式化
 */
Time.parse = function(time) {
	var time_format = new Date(time),
		year = time_format.getFullYear(),
		month = time_format.getMonth() + 1,
		day = time_format.getDate();
	return year + "年" + month + "月" + day + "日";
}

/**
 * @function:时间定位当天的凌晨
 */
Time.strftime = function(time) {
	return new Date(time.split(" ")[0]);
}

/**
 * @function:是否在7天之内
 */
Time.in_seven_days = function(time) {
	return new Date(time).getTime() + 7 * 24 * 60 * 60 * 1000;
}
module.exports = Time;
