/*!
 * 所有页面公用的功能模块
 * common.js - v1.0.0 (2015/11/16)
 * 
 */
define([
    'jquery'
], function ($) {
    // 设置当前页面的导航
    var cur = $('div[data-page]').attr('data-page');
    $('.menu ul.nav li[data-role=' + cur + ']').addClass('active').siblings().removeClass('active');
});
