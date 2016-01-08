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

    // 菜单隐藏显示切换
    $(".toggle-menu").on("click", function (e) {
        e.preventDefault();

        var $nav = $(this).nextAll(".nav");

        if ($nav.is(":visible")) {
            $nav.hide();
        } else {
            $nav.show();
        }
    });

    // 分享模块
    window._bd_share_config = {
        "common": {
            "bdSnsKey": {},
            "bdText": "",
            "bdMini": "2",
            "bdPic": "",
            "bdStyle": "0",
            "bdSize": "32"
        },
        "share": {}
    };
    with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];
});
