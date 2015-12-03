/*!
 * construct modules on tool bar.
 * toolbar.js - v1.0.0 (2015/09/09)
 * http://github.com/ | Released under MIT license
 */
define(['jquery', 'Module'], function ($, M) {
    /**
     * conturct user center module.
     * @module user_center
     */
    M("user_center", {
        init : function () {
            var content = this;

            content.bindEvents();
        },
        bindEvents : function () {
            var $user_setting = $(".header-user-setting"),
                $dropdown_menu = $(".menu-setting");

            $user_setting.on("mouseenter", function (e) {
                e.preventDefault();

                $dropdown_menu.show();
            });

            $dropdown_menu.on("mouseleave", function (e) {
                e.preventDefault();

                $(this).hide();
            });
        }
    });
});
