window.Module = {
    opts: {}
};
// IE6下css背景图不缓存bug
try {
    document.execCommand("BackgroundImageCache", false, true);
} catch (e) {}

// 去除字符串两端的空白
String.prototype.trim || (String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, '');
});

// 函数绑定
Function.prototype.bind || (Function.prototype.bind = function(obj) {
    var callee = this;
    return function() {
        return callee.apply(obj, arguments);
    };
});

// fix ie browser features
window.console || (window.console = {
    log: function() {},
    dir: function() {}
});

// requirejs config
require.config({
    baseUrl: '/js/',
    map: {
        '*': {
            "css": '/js/lib/css.js'
        }
    },
    paths: {
        "Module": "/js/pub/module",

        //公用组件
        'dialogs': '/js/pub/dialogs',
        'jquery.camera': '/js/pub/camera',
        'jquery.easing': '/js/pub/jquery.easing.1.3',
        'jquery.mixitup': '/js/pub/jquery.mixitup.min',
        'jquery.magnific-popup': '/js/pub/jquery.magnific-popup',
        'jquery.fliplightbox': '/js/pub/fliplightbox.min'
    },
    waitSeconds: 30,
    urlArgs: '_=1.0.1',
    help: 'config'
})
