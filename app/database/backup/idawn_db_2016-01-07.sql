# ************************************************************
# Sequel Pro SQL dump
# Version 4499
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.1.73)
# Database: idawn_db
# Generation Time: 2016-01-07 03:43:36 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table albums
# ------------------------------------------------------------

DROP TABLE IF EXISTS `albums`;

CREATE TABLE `albums` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL DEFAULT '',
  `notes` varchar(500) NOT NULL DEFAULT '',
  `uuid` varchar(255) NOT NULL DEFAULT '',
  `cover` varchar(255) DEFAULT NULL,
  `create_date` date NOT NULL DEFAULT '0000-00-00',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

LOCK TABLES `albums` WRITE;
/*!40000 ALTER TABLE `albums` DISABLE KEYS */;

INSERT INTO `albums` (`id`, `title`, `notes`, `uuid`, `cover`, `create_date`)
VALUES
	(1,'绿色风格的课件PPT模板','这是一个绿色风格的课件PPT模板；适用于科技，艺术类的指导课件。','048588f5-009e-4219-a460-627044191ffa','h1.jpg','2015-11-24'),
	(2,'灰色风格的个人介绍模板','灰色风格的个人介绍模板','fc353d28-29ba-457f-a7df-52adb0370cc9','h1.jpg','2015-11-24');

/*!40000 ALTER TABLE `albums` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table articles
# ------------------------------------------------------------

DROP TABLE IF EXISTS `articles`;

CREATE TABLE `articles` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL DEFAULT '',
  `content` text NOT NULL,
  `notes` text,
  `create_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `uuid` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

LOCK TABLES `articles` WRITE;
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;

INSERT INTO `articles` (`id`, `title`, `content`, `notes`, `create_date`, `uuid`)
VALUES
	(1,'在Centos操作系统上安装和配置MySQL','<p>MySQL是一个小型的关系型数据库管理系统，其被广泛地应用在中小型网站中。由于其体积小、速度快、总体拥有成本低，尤其是开放源码这一特点，许多中小型网站为了降低网站总体拥有成本而选择了MySQL作为网站数据库。</p>\n<p>本文主要介绍在Centos5.x和Centos6.x操作系统上，如何安装MySQL，如何配置和启动MySQL服务，以及如何设置用户远程访问权限等。在安装MySQL之前，系统需要已经安装yum和rpm。</p>\n\n<p class=\"sep-line\"></p>\n<h2>安装MySQL</h2>\n\n<div class=\"code\">\n    <p>\n        <span class=\"keyword\">sudo yum</span><span> list mysql mysql-server</span>\n        <span class=\"notes\">// 查看当前系统有无mysql安装包</span>\n    </p>\n    <p>\n        <span class=\"keyword\">sudo yum</span><span> install mysql mysql-server</span>\n        <span class=\"notes\">// 初始化安装</span>\n    </p>\n</div>\n<p>安装过程中遇到Y/N选择时，一直选择Y继续即可。</p>\n\n<p class=\"sep-line\"></p>\n<h2>配置和启动服务</h2>\n\n<div class=\"code\">\n    <p>\n        <span class=\"keyword\">chkconfig</span><span> --level 2345 mysqld on</span>\n        <span class=\"notes\">// 设置开机启动否</span>\n    </p>\n    <p>\n        <span class=\"keyword\">sudo service</span><span> mysqld start|restart</span>\n        <span class=\"notes\">// 启动或者重启服务</span>\n    </p>\n    <p>\n        <span class=\"notes\">// 开启3306端口并保存</span>\n    </p>\n    <p>\n        <span class=\"keyword\">sudo</span><span> /sbin/iptables -I INPUT -p tcp --dport 3306 -j ACCEPT</span>\n    </p>\n    <p>\n        <span class=\"keyword\">sudo</span><span> /etc/rc.d/init.d/iptables save</span>\n    </p>\n</div>\n<p>chkconfig命令主要用来更新（启动或停止）和查询系统服务的运行级信息。谨记chkconfig不是立即自动禁止或激活一个服务，它只是简单的改变了符号连接。</p>\n<table class=\"dictionary\">\n    <tbody>\n        <tr>\n            <td>参数</td>\n            <td>说明</td>\n        </tr>\n        <tr>\n            <td>--level 等级代号</td>\n            <td>\n                指定读系统服务要在哪一个执行等级中开启或关毕。\n                <ul>\n                    <li>等级0表示：表示关机</li>\n                    <li>等级1表示：单用户模式</li>\n                    <li>等级2表示：无网络连接的多用户命令行模式</li>\n                    <li>等级3表示：有网络连接的多用户命令行模式</li>\n                    <li>等级4表示：不可用</li>\n                    <li>等级5表示：带图形界面的多用户模式</li>\n                    <li>等级6表示：重新启动</li>\n                </ul>\n            </td>\n        </tr>\n        <tr>\n            <td>--list [name]</td>\n            <td>显示所有运行级系统服务的运行状态信息（on或off）。如果指定了name，那么只显示指定的服务在不同运行级的状态。 </td>\n        </tr>\n    </tbody>\n</table>\n\n<p class=\"sep-line\"></p>\n<h2>修改密码并设置远程访问</h2>\n\n<div class=\"code\">\n    <p>\n        <span class=\"keyword\">mysql</span>\n        <span> -u root</span>\n        <span class=\"notes\">// 登录数据库</span>\n    </p>\n    <p>\n        <span class=\"notes\">// 连接mysql数据库</span>\n    </p>\n    <p>\n        <span class=\"keyword\">use mysql</span>\n        <span>;</span>\n    </p>\n    <p>\n        <span class=\"keyword\">update</span>\n        <span> user set password=password(\'密码\') where user=\'root\';</span>\n    </p>\n    <p>\n        <span class=\"keyword\">flush</span>\n        <span> privileges;</span>\n    </p>\n    <p>\n        <span class=\"keyword\">grant</span>\n        <span> all privileges on *.* to \'root\'@\'%\' identified by \'123456\' with grant option;</span>\n        <span class=\"notes\">// 设置Mysql远程访问</span>\n    </p>\n</div>','<p>MySQL是一个小型的关系型数据库管理系统，其被广泛地应用在中小型网站中。由于其体积小、速度快、总体拥有成本低，尤其是开放源码这一特点，许多中小型网站为了降低网站总体拥有成本而选择了MySQL作为网站数据库。</p>\n<p>本文主要介绍在Centos5.x和Centos6.x操作系统上，如何安装MySQL，如何配置和启动MySQL服务，以及如何设置用户远程访问权限等。在安装MySQL之前，系统需要已经安装yum和rpm。</p>','2015-11-24 14:29:00','b83fc189-518b-4bbd-a270-a6a96652ceef'),
	(2,'Mac OS常用的快捷键','<p>Mac快捷键中主要有四个修饰键，分别是Command，Control，Option和Shift。这四个键分别有自己的图案，他们经常出现在Mac应用程序中的菜单栏里，方便你随时学习新的快捷键。</p>\n￼\n<p class=\"sep-line\"></p>\n<h2>基本的快捷键</h2>\n\n<p>Command是Mac里最重要的修饰键，在大多数情况下相当于Windows下的Ctrl。所以以下最基本操作很好理解： </p>\n<div class=\"code\">\n    <p>\n        <span>Command-Z</span><span class=\"notes\">// 撤销</span>\n    </p>\n    <p>\n        <span>Command-X</span><span class=\"notes\">// 剪切</span>\n    </p>\n    <p>\n        <span>Command-C</span><span class=\"notes\">// 拷贝</span>\n    </p>\n    <p>\n        <span>Command-V</span><span class=\"notes\">// 粘贴</span>\n    </p>\n    <p>\n        <span>Command-A</span><span class=\"notes\">// 粘贴</span>\n    </p>\n    <p>\n        <span>Command-S</span><span class=\"notes\">// 保存</span>\n    </p>\n    <p>\n        <span>Command-F</span><span class=\"notes\">// 查找</span>\n    </p>\n</div>\n\n<p class=\"sep-line\"></p>\n<h2>应用程序中的快捷键</h2>\n\n<div class=\"code\">\n    <p>\n        <span>Command-Option-esc</span><span class=\"notes\">// 打开强制退出窗口</span>\n    </p>\n    <p>\n        <span>Command-Q</span><span class=\"notes\">// 退出（Quit）最前面的应用程序</span>\n    </p>\n    <p>\n        <span>Command-H</span><span class=\"notes\">// 隐藏（Hide）当前正在运行的应用程序窗口</span>\n    </p>\n    <p>\n        <span>Command-Option-H</span><span class=\"notes\">// 隐藏（Hide）其他应用程序窗口</span>\n    </p>\n    <p>\n        <span>Command-Shift-Z</span><span class=\"notes\">// 重做，也就是撤销的逆向操作</span>\n    </p>\n    <p>\n        <span>Command-Tab</span><span class=\"notes\">// 在打开的应用程序列表中转到下一个最近使用的应用程序，相当于Windows中（Alt+Tab）</span>\n    </p>\n</div>\n\n<p class=\"sep-line\"></p>\n<h2>文本处理中的快捷键</h2>\n\n<div class=\"code\">\n    <p>\n        <span>Command-上箭头</span><span class=\"notes\">// 将光标移至文稿开头</span>\n    </p>\n    <p>\n        <span>Command-下箭头</span><span class=\"notes\">// 将光标移至文稿末尾</span>\n    </p>\n    <p>\n        <span>Command-左箭头</span><span class=\"notes\">// 将光标移至当前行的行首</span>\n    </p>\n    <p>\n        <span>Command-右箭头</span><span class=\"notes\">// 将光标移至当前行的行尾</span>\n    </p>\n    <p>\n        <span>Command-B</span><span class=\"notes\">// 切换所选文字粗体（Bold）显示</span>\n    </p>\n    <p>\n        <span>fn-Delete</span><span class=\"notes\">// 相当于PC全尺寸键盘上的Delete，也就是向后删除</span>\n    </p>\n    <p>\n        <span>fn-上箭头</span><span class=\"notes\">// 向上滚动一页（Page Up）</span>\n    </p>\n    <p>\n        <span>fn-下箭头</span><span class=\"notes\">// 向下滚动一页（Page Down）</span>\n    </p>\n    <p>\n        <span>fn-左箭头</span><span class=\"notes\">// 滚动至文稿开头（Home）</span>\n    </p>\n    <p>\n        <span>fn-右箭头</span><span class=\"notes\">// 滚动至文稿末尾（End）</span>\n    </p>\n    <p>\n        <span>Option-右箭头</span><span class=\"notes\">// 将光标移至下一个单词的末尾</span>\n    </p>\n    <p>\n        <span>Option-左箭头</span><span class=\"notes\">// 将光标移至上一个单词的开头</span>\n    </p>\n    <p>\n        <span>Control-A</span><span class=\"notes\">// 移至行或段落的开头</span>\n    </p>\n</div>\n\n<p class=\"sep-line\"></p>\n<h2>文件处理的快捷键</h2>\n\n<div class=\"code\">\n    <p>\n        <span>Command-Shift-N</span><span class=\"notes\">// 新建文件夹（New）</span>\n    </p>\n    <p>\n        <span>Command-Shift-G</span><span class=\"notes\">// 调出窗口，可输入绝对或者相对路径直达文件夹</span>\n    </p>\n    <p>\n        <span>Command-Option-V</span><span class=\"notes\">// 作用相当于Windows里的文件剪切</span>\n    </p>\n    <p>\n        <span>Command-Delete</span><span class=\"notes\">// 将文件移至废纸篓</span>\n    </p>\n    <p>\n        <span>Command-Shift-Delete</span><span class=\"notes\">// 清倒废纸篓</span>\n    </p>\n    <p>\n        <span>Command-上箭头</span><span class=\"notes\">// 回退</span>\n    </p>\n    <p>\n        <span>Command-下箭头</span><span class=\"notes\">// 前进</span>\n    </p>\n    <p>\n        <span>return</span><span class=\"notes\">// 点击文件，按下return可重命名文件</span>\n    </p>\n    <p>\n        <span>空格键</span><span class=\"notes\">// 点击文件，按下space可预览文件</span>\n    </p>\n</div>\n\n<p class=\"sep-line\"></p>\n<h2>浏览器中的快捷键</h2>\n\n<div class=\"code\">\n    <p>\n        <span>Control-Tab</span><span class=\"notes\">// 转向下一个标签页</span>\n    </p>\n    <p>\n        <span>Control-Shift-Tab</span><span class=\"notes\">// 转向上一个标签页</span>\n    </p>\n    <p>\n        <span>Command-L</span><span class=\"notes\">// 光标直接跳至地址栏</span>\n    </p>\n    <p>\n        <span>Command-加号或等号</span><span class=\"notes\">// 放大页面</span>\n    </p>\n    <p>\n        <span>Command-减号</span><span class=\"notes\">// 缩小页面</span>\n    </p>\n</div>\n\n<p class=\"sep-line\"></p>\n<h2>截屏的快捷键</h2>\n\n<div class=\"code\">\n    <p>\n        <span>Command-Shift-4</span><span class=\"notes\">// 截取所选屏幕区域到一个文件（Desktop）</span>\n    </p>\n    <p>\n        <span>Command-Shift-3</span><span class=\"notes\">// 截取全部屏幕到文件（Desktop）</span>\n    </p>\n    <p>\n        <span>Command-Shift-Control-3</span><span class=\"notes\">// 光截取全部屏幕到剪贴板</span>\n    </p>\n    <p>\n        <span>Command-Shift-4</span><span class=\"notes\">// 截取所选屏幕区域到一个文件，或按空格键仅捕捉一个窗口</span>\n    </p>\n    <p>\n        <span>Command-Shift-Control-4</span><span class=\"notes\">// 截取所选屏幕区域到剪贴板，或按空格键仅捕捉一个窗</span>\n    </p>\n</div>\n\n<p class=\"sep-line\"></p>\n<h2>启动与关机的快捷键</h2>\n\n<p>按住电源按钮5秒 强制Mac关机</p>\n','<p>Mac快捷键中主要有四个修饰键，分别是Command，Control，Option和Shift。这四个键分别有自己的图案，他们经常出现在Mac应用程序中的菜单栏里，方便你随时学习新的快捷键。</p>','2015-12-03 16:19:00','b57221e6b-c034-421e-9903-f9fc4fcfbab9'),
	(3,'不可错过的迷你js库','<p>本文将介绍一些非常赞的开源迷你库；这些库的共性是非常小，而且功能单一。</p>\n\n<h2>cookie.js</h2>\n\n<p>由于原生的JavaScript操作cookie是非常不方便的；因此cookie.js目标就是提供一个容易上手并强力的操作cookie的迷你库；cookie.js提供了一系列的方法来操作cookie，这些方法支持多参数输入和链式操作；而且其不依赖任何第三方库，压缩后只有0.9KB；并且cookie.js可以通过AMD和CommonJS加载。<a href=\"https://github.com/florian/cookie.js\" target=\"_blank\">更多了解</a></p>\n\n<h2>data.js</h2>\n\n<p>data.js是带有消息通知的数据中心，我称其为会说话的数据。旨在让编程变得简单，世界变得美好。其实就是发布订阅模式的一种实现，目的就是程序的解耦合。支持AMD，NPM等多种加载方式。<a href=\"https://github.com/yanhaijing/data.js\" target=\"_blank\">更多了解</a></p>\n\n<h2>favico.js</h2>\n\n<p>favico.js作用是在网站favicon图标上添加徽标；这些徽标可以是简单的数字背景，图片和视频video。<a href=\"http://lab.ejci.net/favico.js/\" target=\"_blank\">更多了解</a></p>\n\n<h2>Move.js</h2>\n\n<p>Move.js提供了一系列简单而优雅的方法来操作CSS3动画。<a href=\"http://visionmedia.github.io/move.js/\" target=\"_blank\">更多了解</a></p>\n\n<h2>Keypress.js</h2>\n\n<p>Keypress.js是一个能够捕获键盘任意按钮输入的库，不用去记忆每个按键的ASCII码即可。<a href=\"http://dmauro.github.io/Keypress/\" target=\"_blank\">更多了解</a></p>\n\n<h2>device.js</h2>\n\n<p>device.js提供了一系列检查浏览器运行平台类型的方法，例如IOS，Android，mobile，Desktop等，比jq.browser全面。<a href=\"http://matthewhudson.me/projects/device.js/\" target=\"_blank\">更多了解</a></p>\n\n<h2>is.js</h2>\n\n<p>is.js提供了一系列检查方法，这些检查方法几乎涵盖了全部的各种检测，例如常用的类型检测，正则表达式检测，排序检测，IP检测等等。<a href=\"http://is.js.org\" target=\"_blank\">更多了解</a></p>\n\n<h2>es5-shim.js和es6-promise.js</h2>\n\n<p>es5-shim.js提供了es5常用的方法实现，es6-promise.js提供了es6的promise方法的实现；用这两个库就不必担心兼容问题。<a href=\"https://github.com/es-shims/es5-shim\" target=\"_blank\">es5-shim.js更多了解</a>--<a href=\"https://github.com/jakearchibald/es6-promise\" target=\"_blank\">es6-promise.js更多了解</a></p>\n\n<h2>share.js</h2>\n\n<p>share.js提供一键分享到微博、QQ空间、QQ好友、微信、腾讯微博、豆瓣、Facebook、Twitter、Linkedin、Google+、点点等社交网站；设计了一套优美的分享图标，是一个比较全面的分享库。<a href=\"https://github.com/overtrue/share.js\" target=\"_blank\">更多了解</a></p>\n\n<h2>mathjs</h2>\n\n<p>mathjs提供了一系列数学运算方法，不仅扩展了原生的Math对象方法，并且更加易于学习和使用。<a href=\"http://mathjs.org/index.html\"  target=\"_blank\">更多了解</a></p>\n\n<h2>placeholder.js</h2>\n\n<p>placeholder.js是一个能够生成图片placeholders的客户端库，不依赖于jQuery或者其他库。<a href=\"https://github.com/hustcc/placeholder.js\" target=\"_blank\">更多了解</a></p>\n\n<p class=\"sep-line\"></p>\n<h2>总结</h2>\n\n<p>本文介绍的只是我自己收集或者用过的一小部分而已，最后向大家推荐<a href=\"http://microjs.com/\" target=\"_blank\">microjs</a>，这里收集了太多小而美的库，自己来淘宝吧。</p>\n\n','<p>本文将介绍一些非常赞的开源迷你库；这些库的共性是非常小，而且功能单一。</p>','2016-01-06 11:58:11','18b2a2f2-c1ac-4d4e-9fe4-3a4d6d133444'),
	(4,'Mocha测试框架的简单介绍','<p>mocha是一个功能丰富的JavaScript测试框架，其可以运行于Node.js服务端，也可以运行于浏览器端；让异步测试更加简单而且有趣；mocha可以连续执行，并且可以灵活的或者精确的配置测试报告来映射未捕获到到得程序异常。本文主要讲述的是最简单最入门的使用方法。</p>\n\n<h2>初始化安装</h2>\n\n<p>mocha需要全局安装，并且mocha的默认执行路径，就是当前项目目录下得test目录内的所有js文件，即test/*.js。</p>\n<div class=\"code\">\n    <p>\n        <span class=\"keyword\">npm</span><span> install -g mocha</span><span class=\"notes\">// 全局安装mocha</span>\n    </p>\n    <p>\n        <span class=\"keyword\">mkdir</span><span> test</span><span class=\"notes\">// 创建test目录</span>\n    </p>\n    <p>\n        <span>$EDITOR test/test.js</span><span class=\"notes\">// 编辑器创建并打开test.js文件</span>\n    </p>\n</div>\n<p>第一个测试实例：</p>\n<div class=\"code\">\n    <p>\n        <span class=\"keyword\">var</span><span> assert = </span><span class=\"keyword\">require</span><span>(\'assert\');</span><span class=\"notes\">// 调用默认的断言库</span>\n    </p>\n    <p>\n        <span class=\"keyword\">describe</span><span>(\'Array\', <span class=\"keyword\">function</span><span> () {</span>\n    </p>\n    <p class=\"text-indent-4\">\n        <span class=\"keyword\">describe</span><span>(\'#indexOf()\', <span class=\"keyword\">function</span><span> () {</span>\n    </p>\n    <p class=\"text-indent-8\">\n        <span class=\"keyword\">it</span><span>(\'should return -1 when the value is not present\', <span class=\"keyword\">function</span><span> () {</span>\n    </p>\n    <p class=\"text-indent-12\">\n        <span class=\"keyword\">assert</span>.<span class=\"keyword\">equal</span><span>(-1, [1,2,3].</span><span class=\"keyword\">indexOf</span><span>(5));</span>\n    </p>\n    <p class=\"text-indent-12\">\n        <span class=\"keyword\">assert</span>.<span class=\"keyword\">equal</span><span>(-1, [1,2,3].</span><span class=\"keyword\">indexOf</span><span>(0));</span>\n    </p>\n    <p class=\"text-indent-8\">\n        <span>});</span>\n    </p>\n    <p class=\"text-indent-4\">\n        <span>});</span>\n    </p>\n    <p>\n        <span>});</span>\n    </p>\n</div>\n<p>命令行执行mocha，其运行结果：</p>\n<p><img src=\"/img/29c9dc53-8fa1-40a5-a2fd-28d550203153/1.jpg\" alt=\"运行结果\"></p>\n\n<h2>Assertions断言库</h2>\n\n<p>mocha默认的断言库是assert，其常用的测试方法有：</p>\n<ul>\n    <li>\n        <p>assert.fail(actual, expected, message, operator)</p>\n        <p></p>\n    </li>\n    <li>\n        <p>assert(value, message), assert.ok(value, [message])</p>\n        <p></p>\n    </li>\n    <li>\n        <p>assert.equal(actual, expected, [message])</p>\n        <p></p>\n    </li>\n    <li>\n        <p>assert.notEqual(actual, expected, [message])</p>\n        <p></p>\n    </li>\n    <li>\n        <p>assert.deepEqual(actual, expected, [message])</p>\n        <p></p>\n    </li>\n    <li>\n        <p>assert.notDeepEqual(actual, expected, [message])</p>\n        <p></p>\n    </li>\n    <li>\n        <p>assert.strictEqual(actual, expected, [message])</p>\n        <p></p>\n    </li>\n    <li>\n        <p>assert.notStrictEqual(actual, expected, [message])</p>\n        <p></p>\n    </li>\n    <li>\n        <p>assert.throws(block, [error], [message])</p>\n        <p></p>\n    </li>\n    <li>\n        <p>assert.doesNotThrow(block, [error], [message])</p>\n        <p></p>\n    </li>\n    <li>\n        <p>assert.ifError(value)</p>\n        <p></p>\n    </li>\n</ul>\n<p>mocha支持任何第三方的断言库，只要其能抛出错误异常即可；这就意味着你可以使用常见的你熟悉的任何断言库，例如：should.js，expect.js，chai.js等等。</p>\n\n<h2>异步测试</h2>\n\n<p>文章刚开始的例子是一个同步执行的例子，那么如何进行异步测试呢？例如ajax请求结果的测试，数据库请求结果的测试等等。其实对于mocha来说，异步测试是非常简单的，只需要在测试用例函数it，添加回调函数即可，看下面的例子：</p>\n<div class=\"code\">\n    <p>\n        <span class=\"keyword\">var</span><span> assert = </span><span class=\"keyword\">require</span><span>(\'assert\');</span><span class=\"notes\">// 调用默认的断言库</span>\n    </p>\n    <p>\n        <span class=\"keyword\">describe</span><span>(\'User\', <span class=\"keyword\">function</span><span> () {</span>\n    </p>\n    <p class=\"text-indent-4\">\n        <span class=\"keyword\">describe</span><span>(\'#save()\', <span class=\"keyword\">function</span><span> () {</span>\n    </p>\n    <p class=\"text-indent-8\">\n        <span class=\"keyword\">it</span><span>(\'should save without error\', <span class=\"keyword\">function</span><span> (done) {</span>\n    </p>\n    <p class=\"text-indent-12\">\n        <span class=\"keyword\">var</span><span> user = </span><span class=\"keyword\">new</span><span> User(\'Luna\');</span>\n    </p>\n    <p class=\"text-indent-12\">\n        <span>user.save(done);</span><span class=\"notes\">// 因为done函数本身可接受一个error参数，因此不需要save异步</span>\n    </p>\n    <p class=\"text-indent-8\">\n        <span>});</span>\n    </p>\n    <p class=\"text-indent-4\">\n        <span>});</span>\n    </p>\n    <p>\n        <span>});</span>\n    </p>\n</div>\n\n<h2>测试条件初始化函数</h2>\n\n<p>mocha提供了一系列的函数：before（所有的测试执行前执行），after（所有的测试执行后执行），beforeEach（每个的测试执行前执行），afterEach（每个的测试执行后执行）；这些函数用于预先设置测试的条件和测试结束后清理测试结果。</p>\n\n<h2>参考</h2>\n\n<p><a href=\"http://mochajs.org/\" target=\"_blank\">mocha官方网站</a></p>\n\n\n','<p>mocha是一个功能丰富的JavaScript测试框架，其可以运行于Node.js服务端，也可以运行于浏览器端；让异步测试更加简单而且有趣；mocha可以连续执行，并且可以灵活的或者精确的配置测试报告来映射未捕获到到得程序异常。本文主要讲述的是最简单最入门的使用方法。</p>','2016-01-07 11:07:22','29c9dc53-8fa1-40a5-a2fd-28d550203153');

/*!40000 ALTER TABLE `articles` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table articles_type
# ------------------------------------------------------------

DROP TABLE IF EXISTS `articles_type`;

CREATE TABLE `articles_type` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL DEFAULT '',
  `notes` varchar(500) NOT NULL DEFAULT '',
  `uuid` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

LOCK TABLES `articles_type` WRITE;
/*!40000 ALTER TABLE `articles_type` DISABLE KEYS */;

INSERT INTO `articles_type` (`id`, `title`, `notes`, `uuid`)
VALUES
	(1,'HTML/CSS','HTML/CSS',''),
	(2,'JavaScript','JavaScript',''),
	(3,'Node/Database','Node/Database','b83fc189-518b-4bbd-a270-a6a96652ceef'),
	(4,'网络协议','网络协议',''),
	(5,'开发工具','开发工具','b57221e6b-c034-421e-9903-f9fc4fcfbab9'),
	(6,'行业杂谈','行业杂谈','');

/*!40000 ALTER TABLE `articles_type` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table mottos
# ------------------------------------------------------------

DROP TABLE IF EXISTS `mottos`;

CREATE TABLE `mottos` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `author` varchar(255) NOT NULL DEFAULT '',
  `content` text NOT NULL,
  `theme` varchar(255) NOT NULL DEFAULT '',
  `slider` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='格言';

LOCK TABLES `mottos` WRITE;
/*!40000 ALTER TABLE `mottos` DISABLE KEYS */;

INSERT INTO `mottos` (`id`, `author`, `content`, `theme`, `slider`)
VALUES
	(1,'软件工程的Mosher定律','程序有问题时不要担心。如果所有东西都没问题，你就失业了。','them1.jpg','slider1.jpg'),
	(2,'Jessica Gaston','一个人写的烂软件将会给另一个人带来一份全职工作。','them2.jpg','slider2.jpg'),
	(3,'比尔-盖茨','按代码行数来评估软件开发的进度，就如同按重量来评估飞机建造的进度。','them3.jpg','slider3.jpg'),
	(4,'Ryan Campbell','注释代码很像清洁你的厕所——你不想干，但如果你做了，这绝对会给你和你的客人带来更愉悦的体验。','them4.jpg','slider4.jpg'),
	(5,'Anonymous','除非最后一个用户死掉，软件是不会有完工的时候的。','them6.jpg','slider6.jpg');

/*!40000 ALTER TABLE `mottos` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
