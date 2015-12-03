define('Module', ['jquery'], function($) {
    if (!window.Module) {
        window.Module = {
            opts: {}
        };
    }
    M.List = {};
    /**
     * 模块加载调用管理
     * @param {string} key     模块名称
     * @param {object} module  模块对象
     * @param {object} options 参数对象
     */
    function M(key, module, options) {
        this.tmp = false;
        this.exopts = {};

        if (arguments.length === 1) {
            // 设置options
            if (typeof key === 'object') {
                options = key;
                $.extend(Module.opts, options);
                return;
            }
            // 获取模块
            else if (typeof key === 'string') {
                return M.List[key];
            }
        }

        // 增加新模块
        if (typeof key === 'string' && typeof module === 'object') {
            if (M.List[key]) {
                module = $.extend(M.List[key], module);
            }
            M.List[key] = module;
            typeof options === 'object' && $.extend(Module.opts, options);

            if (M.List[key] && M.List[key].Init) {
                M.List[key].Init(Module.opts);
            }

            if (M.List[key] && M.List[key].Queue) {
                Module.loginQueue && Module.loginQueue.push(M.List[key].Queue);
            }
        }
    }

    $.extend(Module, {
        Module: M
    });

    /**
     * 队列与堆栈
     */
    Module.Buffers = function() {
        this._s = [];
        this.type = false;
        if (arguments[0] == "queue") {
            this.type = true;
        }
    };
    Module.Buffers.prototype = {
        /*
         * @info: 元素入队
         * @param: vElement元素列表
         * @return: 返回当前队列元素个数
         * @remark: 1.EnQueue方法参数可以多个
         *    2.参数为空时返回-1
         */
        push: function(aElement) {
            if (arguments.length === 0) return false;
            //元素入栈
            for (var i = 0; i < arguments.length; i++) {
                this._s.push(arguments[i]);
            }
            return this._s.length;
        },
        /**
         * 同上，兼容老版本
         */
        append: function(aElement) {
            this.push(aElement);
        },
        /**
         * 元素出
         */
        pop: function() {
            if (this._s.length === 0) {
                return null;
            } else {
                if (this.type) {
                    return this._s.pop();
                } else {
                    return this._s.shift();
                }
            }
        },
        /*
         * @info: 返回队头元素值
         * @return: vElement
         * @remark: 若为空则返回null
         */
        getTop: function() {
            if (this._s.length === 0) return null;
            else if (this.type) {
                return this._s[this._s.length - 1];
            } else {
                return this._s[0];
            }
        },
        /*
         * @info: 返回尾元素值
         * @return: vElement
         * @remark: 若为空则返回null
         */
        getLast: function() {
            if (this._s.length === 0) return null;
            else if (this.type) {
                return this._s[0];
            } else {
                return this._s[this._s.length - 1];
            }
        },
        /*
         * @info: 获取元素个数
         * @return: 元素个数
         */
        size: function() {
            return this._s.length;
        },
        /*
         * @info: 清空
         */
        empty: function() {
            this._s.length = 0;
        },
        /*
         * @info: 判是否为空
         * @return: 堆栈为空返回true,否则返回false
         */
        isEmpty: function() {
            if (this._s.length === 0) return true;
            else return false;
        },
        toString: function() {
            var str = this._s.join("");
            this._s.length = 0;
            return str;
        },
        toArray: function() {
            return this._s;
        },
        toJson: function() {
            return $.ParseJSON();
        }
    };

    //fn 扩展
    $.extend($.fn, {
        /*可循环轮播*/
        slide: function(option) {
            var opts = $.extend({
                    //默认容器标签
                    container: 'ul',
                    //默认条目标签
                    item: 'li',
                    //默认翻前一页标签class
                    prev: '.prev',
                    //默认翻后一页标签class
                    next: '.next',
                    //默认分屏
                    num: 1,
                    //默认滑动动画时间
                    speed: 500,
                    //是否自动轮播
                    auto: true,
                    //轮播开始的索引，0开始
                    start: 0,
                    //是否循环轮播
                    loop: true,
                    //鼠标移入时候是否暂定自动轮播，该选项在启动自动轮播的情况下生效
                    pause: true,
                    //自动轮播时间间隔
                    time: 3000,
                    //轮播后的回调函数
                    callback: null
                }, option),
                $this = this,
                $container = $this.find(opts.container),
                $items = $container.find(opts.item),
                $prev = $this.find(opts.prev),
                $next = $this.find(opts.next),
                _width = $items.outerWidth(true),
                len = $items.length,
                page = Math.ceil(len / opts.num),
                moving = false,
                n = 0,
                itemIndex = opts.start || 0,
                exports = {
                    n: 0,
                    go: loop
                },
                timer;
            //如果设置了起始页面索引，itemIndex指向此页
            if (opts.start > 0 && opts.start < page) {
                itemIndex = opts.start;
            }
            init();
            //绑定翻页事件
            $prev.bind('click', function(e) {
                e.preventDefault();
                exports.n--;

                $prev.show();
                $next.show();
                if (!opts.loop && exports.n <= 0) {
                    $prev.hide();
                }

                loop();
            });
            $next.bind('click', function(e) {
                e.preventDefault();
                exports.n++;

                $prev.show();
                $next.show();
                if (!opts.loop && exports.n >= page - 1) {
                    $next.hide();
                }

                loop();
            });
            //是否开启自动轮播
            if (opts.auto) {
                opts.loop = true; //如果开启自动轮播，那么loop屏蔽，不起作用
                timer = setInterval(function() {
                    loop(++exports.n);
                }, opts.time);
                $.each([$prev, $next], function() {
                    $(this).bind('click', function() {
                        clearInterval(timer);
                        timer = setInterval(function() {
                            loop(++exports.n);
                        }, opts.time);
                    });
                });
                //是否绑定鼠标移入后暂停轮播
                if (opts.pause) {
                    $container.parent().bind('mouseenter', function() {
                        clearInterval(timer);
                    });
                    $container.parent().bind('mouseleave', function() {
                        clearInterval(timer);
                        timer = setInterval(function() {
                            loop(++exports.n);
                        }, opts.time);
                    });
                }
            }
            //初始化，
            function init() {
                if (len <= opts.num) {
                    $prev.hide();
                    $next.hide();
                } else {
                    //克隆一段相同的html代码，做轮播效果
                    $items.first().clone().appendTo($container);
                    $container.width((len + 1) * _width);
                }

                //设置初始化显示的图片
                exports.n = itemIndex;
                $container.css('margin-left', -exports.n * _width * opts.num);
                $items.removeClass("itemOn");
                $items.eq(itemIndex).addClass("itemOn");
                if (!!opts.callback) {
                    opts.callback(itemIndex);
                }
            }

            //轮播效果，借助animate动态修改margin值来达到滑动效果
            function loop(index, type) {
                exports.n = index !== undefined ? index : exports.n;
                if (exports.n > page) {
                    exports.n = 1;
                    $container.css('margin-left', 0);
                }
                if (exports.n < 0) {
                    exports.n = page - 1;
                    $container.css('margin-left', -page * _width);
                }
                if (type === 'instance') {
                    $container.css({
                        marginLeft: -exports.n * _width * opts.num
                    });
                    if (exports.n == page) {
                        $container.css('margin-left', 0);
                        exports.n = 0;
                    }
                } else {
                    $container.stop().animate({
                        marginLeft: -exports.n * _width * opts.num
                    }, opts.speed, function() {
                        // moving = false;
                        if (exports.n >= page) {
                            $container.css('margin-left', 0);
                            exports.n = 0;
                        }
                        //获取当前item 索引
                        itemIndex = -($container.css("marginLeft").replace("px", "") / _width);
                        $items.removeClass("itemOn");
                        $items.eq(itemIndex).addClass("itemOn");

                        if (!!opts.callback) {
                            opts.callback(itemIndex);
                        }
                    });
                }
            }
            this.exports = exports;
            return this;
        }
    });

    //Module 扩展
    $.extend(Module, {
        getscript: function(url, info) {
            var info = $.extend({}, info);
            info._d = info._d || document;

            var _d = info._d.getElementsByTagName("head")[0],
                script = info._d.createElement('script'),
                arg = info.arg || [];

            script.type = 'text/javascript';
            if (info._b) {
                script.innerHTML = info._b;
            }
            if (url && url != "") {
                script.src = url;
            }

            if ($.browser.msie) {
                script.onreadystatechange = function() {
                    var state = script.readyState;
                    if (state == "loaded" || state == "interactive" || state == "complete") {
                        this.parentNode.removeChild(this);
                        if (info.callback) {
                            return info.callback.apply(this, (arg || []))
                        }
                    } else {
                        script.src = url;
                    }
                };
            } else {}

            _d.appendChild(script);
        },
        getCss: function(urls, options, callback) {
            var head = document.getElementsByTagName("head")[0],
                loadedCompleteRegExp = /loaded|complete/,
                options = options || {},
                callback = new Function,
                callbacksNb = 0,
                timer;

            if ($.type(options) == "function") {
                callback = options;
            }

            function loadcss(url, options, callback) {
                var link = document.createElement("link");
                link.rel = 'stylesheet';
                link.type = 'text/css';
                link.media = options.media || 'screen';
                link.href = url;
                if (options.charset) {
                    link.charset = options.charset;
                }

                if (options.title) {
                    callback = (function(callback) {
                        return function() {
                            link.title = options.title;
                            callback(link, "success");
                        };
                    })(callback);
                }

                // onreadystatechange
                if (link.readyState) {
                    link.onreadystatechange = function() {
                        if (loadedCompleteRegExp.test(link.readyState)) {
                            link.onreadystatechange = null;
                            callback(link, "success");
                        }
                    };

                    // If onload is available, use it
                } else if (link.onload === null) {
                    link.onload = function() {
                        link.onload = null;
                        callback(link, "success");
                    };

                    // In any other browser, we poll
                } else {
                    if ($.browser.core != "msie" && $.browser.core != "opera") {
                        link.innerHTML = '@import "' + url + '";';
                    }

                    // poll(cssPollFunction);
                    timer = window.setInterval(function() {
                            try {
                                // We store so that minifiers don't remove the code
                                callback.r = link.sheet.cssRules;
                                throw 'SECURITY';
                            } catch (e) {
                                // Gecko: catch NS_ERROR_DOM_SECURITY_ERR
                                // Webkit: catch SECURITY
                                if (callbacksNb > 10) {
                                    callback(link, "error");
                                    timer = window.clearInterval(timer);
                                    return false;
                                }
                                if (/security/.test((e.name || e).toLowerCase())) {
                                    // setTimeout(callback, 0);
                                    callback(link, "success");
                                    timer = window.clearInterval(timer);
                                }
                                callbacksNb++;
                            }
                        },
                        10);

                }

                head.appendChild(link);
            };

            if (typeof urls === "string") {
                loadcss(urls, options, callback);
            } else if ($.isArray(urls)) {
                $.each(urls, function(i) {
                    loadcss(urls[i], options, callback);
                })
            }
        },
        /**
         * 读写cookie
         * @param {Object} key
         * @param {Object} value
         * @param {Object} options
         */
        cookie: function(key, value, options) {
            if (arguments.length == 0) {
                try {
                    if (navigator.cookieEnabled == false) {
                        return false;
                    }
                } catch (e) {
                    if (window.console) {
                        console.info(e)
                    }
                }
                return true;
            }
            // key and at least value given, set cookie...
            if (arguments.length > 1 && String(value) !== "[object Object]") {
                options = $.extend({},
                    options);
                if (value === null || value === undefined) {
                    options.expires = -1;
                }
                if (typeof options.expires === 'number') {
                    var days = options.expires,
                        t = options.expires = new Date();
                    t.setDate(t.getDate() + days);
                }
                value = String(value);
                return (document.cookie = [encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value), options.expires ? '; expires=' + options.expires.toUTCString() : '', options.path ? '; path=' + options.path : '', options.domain ? '; domain=' + options.domain : '', options.secure ? '; secure' : ''].join(''));
            }
            // key and possibly options given, get cookie...
            options = value || {};
            var result, decode = options.raw ? function(s) {
                return s;
            } : decodeURIComponent;
            return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : "";
        },
        /**
         * 取参数
         * @param {Object} u
         * @param {Object} o
         */
        getParm: function(u, o) {
            var params, locallink = window.location.toString(),
                url = u ? u : locallink;

            if ($.type(url) == "object") {
                params = $.param(url);
                locallink = o ? o : locallink;
                if (locallink.indexOf("?") == -1) {
                    locallink += "?";
                } else {
                    locallink += "&";
                }
                return locallink += params;
            } else if ($.type(url) == "string") {
                var arr = url.split("?"),
                    parms = arr[1],
                    params = {};
                if (parms && parms.indexOf("&")) {
                    var parmList = parms.split("&");
                    jQuery.each(parmList, function(key, val) {
                        if (val && val.indexOf("=")) {
                            var parmarr = val.split("=");
                            if ($.type(o) == "string" && o == parmarr[0]) {
                                params = parmarr[1] == null ? '' : parmarr[1];
                                return true;
                            } else {
                                params[parmarr[0]] = parmarr[1];
                            }
                        }
                    });
                }
            }
            return params;
        },
        getUrl: function(url) {
            var url = url || window.location.toString(),
                re = /(\w+):\/\/([^\:|\/]+)(\:\d*)?(.*\/)([^#|\?|\n]+)?(#.*)?(\?.*)?/i;
            var arr = url.match(re);
            if (!!!arr) {
                var re = url.match(/(\w+):\/\/(.*)/);
                arr = [re ? re[0] : url, re ? re[1] : "", re ? re[2] : "", "", "", "", "", ""];
            }
            return arr;
        },
        //得到字符串的长度，一个汉字算2个字节
        getStrLen: function(str, len, d) {
            if (!str) {
                return;
            }
            var chineseRegex = /[^\x00-\xff]/ig,
                cArr = str.match(chineseRegex);
            if (arguments.length == 1) {

                return str.length + (cArr == null ? 0 : cArr.length);
            }
            var newLength = 0,
                newStr = "",
                singleChar = "",
                strLength = str.replace(chineseRegex, "**").length
            for (var i = 0; i < strLength; i++) {
                singleChar = str.charAt(i).toString();
                if (singleChar.match(chineseRegex) != null) {
                    newLength += 2;
                } else {
                    newLength++;
                }
                if (newLength > len) {
                    break;
                }
                newStr += singleChar;
            }

            if (strLength > len && $.type(d) == "string") {
                newStr += d;
            } else if (strLength > len && $.type(d) == "boolean") {
                newStr += "...";
            }
            return newStr;

        },
        getStringLen: function(str) {
            return this.getStrLen(str);
        },
        /**
         * 标志替换
         * @param {Object} str
         * @param {Object} data
         */
        ParseTpl: function(str, data) {
            var result;
            var patt = new RegExp("\{{\#([a-zA-z0-9]+)\}}");
            while ((result = patt.exec(str)) != null) {
                var v = data[result[1]] === 0 ? "0" : data[result[1]] || '';
                str = str.replace(new RegExp(result[0], "g"), v);
            };
            return str;
        },

        /**
         * 随机数
         */
        rdStr: function(size, plusTimeStamp) {
            var size0 = 8;
            var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
            size = size || size0;
            size = size < 1 ? size0 : size;
            size = size > chars.length ? chars.length : size;
            var s = '';
            for (var i = 0; i < size; i++) {
                var rnum = Math.floor(Math.random() * chars.length);
                s += chars.substring(rnum, rnum + 1);
            };
            if (plusTimeStamp) {
                s += new Date().getTime();
            };
            return s;
        },
        getTime: {
            now: function() {
                return (new Date()).getTime();
            },
            getDateStr: function(time, splitStr) {
                var hms = function(n) {
                    if ($.type(n) !== 'number') return;
                    if (n == 3) {
                        return " " + h + ":" + m + ":" + s;
                    }
                    if (n == 4) {
                        return " " + hh + ":" + mm;
                    }
                    if (n == 6) {
                        return " " + hh + ":" + mm + ":" + ss;
                    }
                    return "";
                }
                if (!splitStr) {
                    if (time < 10) {
                        splitStr = time;
                        time = new Date();
                    }
                }

                var time = time || new Date();
                var rs = '-',
                    HHMMSS = '',
                    t = new Date(time);
                t.setTime(time);
                var Y = t.getFullYear(),
                    YY = Y + "".substring(2, 4),
                    M = t.getMonth() + 1,
                    D = t.getDate(),
                    h = t.getHours(),
                    m = t.getMinutes(),
                    s = t.getSeconds();
                var MM = M < 10 ? '0' + M : M,
                    DD = D < 10 ? '0' + D : D,
                    hh = h < 10 ? '0' + h : h,
                    mm = m < 10 ? '0' + m : m,
                    ss = s < 10 ? '0' + s : s;
                var data = {
                    "Y": Y,
                    "YY": YY,
                    "M": M,
                    "MM": MM,
                    "D": D,
                    "DD": DD,
                    "h": h,
                    "hh": hh,
                    "m": m,
                    "mm": mm,
                    "s": s,
                    "ss": ss
                };
                switch ($.type(splitStr)) {
                    case 'string':
                        rs = splitStr;
                        break;
                    case 'number':
                        HHMMSS = hms(splitStr)
                        break;
                    case 'object':
                        if (splitStr.tpl) {
                            str = $.ParseTpl ? $.ParseTpl(splitStr.tpl, data) : data;
                            return str;
                            break;
                        }
                        rs = splitStr.rs ? splitStr.rs : rs;
                        HHMMSS = hms(splitStr.HHMMSS ? splitStr.HHMMSS : HHMMSS);
                        break;
                }
                var str = Y + rs + M + rs + D + HHMMSS;
                return str;
            },
            friendly: function(time) {
                //设置只支持秒数～
                if ($.type(time) != "number") return '';
                var tip = '',
                    second = 1000,
                    minute = second * 60,
                    hour = minute * 60,
                    now_time = +new Date,
                    now = new Date(),
                    now_year = now.getFullYear(),
                    now_month = now.getMonth(),
                    now_date = now.getDate(),
                    now_midnight = new Date(now_year, now_month, now_date),
                    midnight_time = now_midnight.getTime(),
                    diff = now_time - time;
                // 处理时间格式
                if (diff < 0) {
                    tip = '';
                } else if (diff <= minute * 5) {
                    tip = '刚刚';
                } else if (diff < hour) {
                    var m = Math.floor(diff / minute);
                    tip = m + '分钟前';
                } else if (diff < now_time - midnight_time) {
                    var t = new Date(time),
                        hh = t.getHours(),
                        mm = t.getMinutes();
                    if (hh < 10) {
                        hh = '0' + hh;
                    }
                    if (mm < 10) {
                        mm = '0' + mm;
                    }
                    tip = '今日 ' + hh + ':' + mm;
                } else {
                    var t = new Date(time),
                        YY = t.getFullYear(),
                        MM = t.getMonth() + 1,
                        DD = t.getDate(),
                        hh = t.getHours(),
                        mm = t.getMinutes();
                    if (MM < 10) {
                        MM = '0' + MM;
                    }
                    if (DD < 10) {
                        DD = '0' + DD;
                    }
                    if (hh < 10) {
                        hh = '0' + hh;
                    }
                    if (mm < 10) {
                        mm = '0' + mm;
                    }
                    tip = YY + '年' + MM + '月' + DD + '日 ' + hh + ':' + mm;
                }
                return tip;
            },
            countDown: function() {
                if (parseInt(arguments[0]) > 0) {
                    var t = this,
                        type = false;
                    times = Math.floor((arguments[0] - (arguments[1] || (new Date()).getTime())) / 1000);
                    if (times < 0) {
                        type = true;
                        times = times < 0 ? -times : times;
                    }
                    return {
                        t: type,
                        s: times % 60,
                        ss: times % 60 < 10 ? "0" + times % 60 : times % 60,
                        m: Math.floor(times / 60) % 60,
                        mm: Math.floor(times / 60) % 60 < 10 ? "0" + Math.floor(times / 60) % 60 : Math.floor(times / 60) % 60,
                        h: Math.floor(times / 3600) % 24,
                        hh: Math.floor(times / 3600) % 24 < 10 ? "0" + Math.floor(times / 3600) % 24 : Math.floor(times / 3600) % 24,
                        D: Math.floor(times / 86400),
                        DD: Math.floor(times / 86400) < 10 ? "0" + Math.floor(times / 86400) : Math.floor(times / 86400)
                    }
                } else {
                    return {};
                }
            },
            countTimer: new Array()
        }
    });

    /**
     * 初始化类，做基本定义，调数据，加载插件等工作
     */
    var _Module = $.extend({}, window.Module);

    _Module.version = '1.0.0';

    window.Module = function () {
        return _Module.Module.apply(this, $.makeArray(arguments));
    };

    $.extend(window.Module, _Module);

    return Module;
});

