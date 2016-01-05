# ************************************************************
# Sequel Pro SQL dump
# Version 4499
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.1.73)
# Database: idawn_db
# Generation Time: 2016-01-05 10:33:48 +0000
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
	(2,'Mac OS常用的快捷键','<p>Mac快捷键中主要有四个修饰键，分别是Command，Control，Option和Shift。这四个键分别有自己的图案，他们经常出现在Mac应用程序中的菜单栏里，方便你随时学习新的快捷键。</p>\n￼\n<p class=\"sep-line\"></p>\n<h2>基本的快捷键</h2>\n\n<p>Command是Mac里最重要的修饰键，在大多数情况下相当于Windows下的Ctrl。所以以下最基本操作很好理解： </p>\n<div class=\"code\">\n    <p>\n        <span>Command-Z</span><span class=\"notes\">// 撤销</span>\n    </p>\n    <p>\n        <span>Command-X</span><span class=\"notes\">// 剪切</span>\n    </p>\n    <p>\n        <span>Command-C</span><span class=\"notes\">// 拷贝</span>\n    </p>\n    <p>\n        <span>Command-V</span><span class=\"notes\">// 粘贴</span>\n    </p>\n    <p>\n        <span>Command-A</span><span class=\"notes\">// 粘贴</span>\n    </p>\n    <p>\n        <span>Command-S</span><span class=\"notes\">// 保存</span>\n    </p>\n    <p>\n        <span>Command-F</span><span class=\"notes\">// 查找</span>\n    </p>\n</div>\n\n<p class=\"sep-line\"></p>\n<h2>应用程序中的快捷键</h2>\n\n<div class=\"code\">\n    <p>\n        <span>Command-Option-esc</span><span class=\"notes\">// 打开强制退出窗口</span>\n    </p>\n    <p>\n        <span>Command-Q</span><span class=\"notes\">// 退出（Quit）最前面的应用程序</span>\n    </p>\n    <p>\n        <span>Command-H</span><span class=\"notes\">// 隐藏（Hide）当前正在运行的应用程序窗口</span>\n    </p>\n    <p>\n        <span>Command-Option-H</span><span class=\"notes\">// 隐藏（Hide）其他应用程序窗口</span>\n    </p>\n    <p>\n        <span>Command-Shift-Z</span><span class=\"notes\">// 重做，也就是撤销的逆向操作</span>\n    </p>\n    <p>\n        <span>Command-Tab</span><span class=\"notes\">// 在打开的应用程序列表中转到下一个最近使用的应用程序，相当于Windows中（Alt+Tab）</span>\n    </p>\n</div>\n\n<p class=\"sep-line\"></p>\n<h2>文本处理中的快捷键</h2>\n\n<div class=\"code\">\n    <p>\n        <span>Command-上箭头</span><span class=\"notes\">// 将光标移至文稿开头</span>\n    </p>\n    <p>\n        <span>Command-下箭头</span><span class=\"notes\">// 将光标移至文稿末尾</span>\n    </p>\n    <p>\n        <span>Command-左箭头</span><span class=\"notes\">// 将光标移至当前行的行首</span>\n    </p>\n    <p>\n        <span>Command-右箭头</span><span class=\"notes\">// 将光标移至当前行的行尾</span>\n    </p>\n    <p>\n        <span>Command-B</span><span class=\"notes\">// 切换所选文字粗体（Bold）显示</span>\n    </p>\n    <p>\n        <span>fn-Delete</span><span class=\"notes\">// 相当于PC全尺寸键盘上的Delete，也就是向后删除</span>\n    </p>\n    <p>\n        <span>fn-上箭头</span><span class=\"notes\">// 向上滚动一页（Page Up）</span>\n    </p>\n    <p>\n        <span>fn-下箭头</span><span class=\"notes\">// 向下滚动一页（Page Down）</span>\n    </p>\n    <p>\n        <span>fn-左箭头</span><span class=\"notes\">// 滚动至文稿开头（Home）</span>\n    </p>\n    <p>\n        <span>fn-右箭头</span><span class=\"notes\">// 滚动至文稿末尾（End）</span>\n    </p>\n    <p>\n        <span>Option-右箭头</span><span class=\"notes\">// 将光标移至下一个单词的末尾</span>\n    </p>\n    <p>\n        <span>Option-左箭头</span><span class=\"notes\">// 将光标移至上一个单词的开头</span>\n    </p>\n    <p>\n        <span>Control-A</span><span class=\"notes\">// 移至行或段落的开头</span>\n    </p>\n</div>\n\n<p class=\"sep-line\"></p>\n<h2>文件处理的快捷键</h2>\n\n<div class=\"code\">\n    <p>\n        <span>Command-Shift-N</span><span class=\"notes\">// 新建文件夹（New）</span>\n    </p>\n    <p>\n        <span>Command-Shift-G</span><span class=\"notes\">// 调出窗口，可输入绝对或者相对路径直达文件夹</span>\n    </p>\n    <p>\n        <span>Command-Option-V</span><span class=\"notes\">// 作用相当于Windows里的文件剪切</span>\n    </p>\n    <p>\n        <span>Command-Delete</span><span class=\"notes\">// 将文件移至废纸篓</span>\n    </p>\n    <p>\n        <span>Command-Shift-Delete</span><span class=\"notes\">// 清倒废纸篓</span>\n    </p>\n    <p>\n        <span>Command-上箭头</span><span class=\"notes\">// 回退</span>\n    </p>\n    <p>\n        <span>Command-下箭头</span><span class=\"notes\">// 前进</span>\n    </p>\n    <p>\n        <span>return</span><span class=\"notes\">// 点击文件，按下return可重命名文件</span>\n    </p>\n    <p>\n        <span>空格键</span><span class=\"notes\">// 点击文件，按下space可预览文件</span>\n    </p>\n</div>\n\n<p class=\"sep-line\"></p>\n<h2>浏览器中的快捷键</h2>\n\n<div class=\"code\">\n    <p>\n        <span>Control-Tab</span><span class=\"notes\">// 转向下一个标签页</span>\n    </p>\n    <p>\n        <span>Control-Shift-Tab</span><span class=\"notes\">// 转向上一个标签页</span>\n    </p>\n    <p>\n        <span>Command-L</span><span class=\"notes\">// 光标直接跳至地址栏</span>\n    </p>\n    <p>\n        <span>Command-加号或等号</span><span class=\"notes\">// 放大页面</span>\n    </p>\n    <p>\n        <span>Command-减号</span><span class=\"notes\">// 缩小页面</span>\n    </p>\n</div>\n\n<p class=\"sep-line\"></p>\n<h2>截屏的快捷键</h2>\n\n<div class=\"code\">\n    <p>\n        <span>Command-Shift-4</span><span class=\"notes\">// 截取所选屏幕区域到一个文件（Desktop）</span>\n    </p>\n    <p>\n        <span>Command-Shift-3</span><span class=\"notes\">// 截取全部屏幕到文件（Desktop）</span>\n    </p>\n    <p>\n        <span>Command-Shift-Control-3</span><span class=\"notes\">// 光截取全部屏幕到剪贴板</span>\n    </p>\n    <p>\n        <span>Command-Shift-4</span><span class=\"notes\">// 截取所选屏幕区域到一个文件，或按空格键仅捕捉一个窗口</span>\n    </p>\n    <p>\n        <span>Command-Shift-Control-4</span><span class=\"notes\">// 截取所选屏幕区域到剪贴板，或按空格键仅捕捉一个窗</span>\n    </p>\n</div>\n\n<p class=\"sep-line\"></p>\n<h2>启动与关机的快捷键</h2>\n\n<p>按住电源按钮5秒 强制Mac关机</p>\n','<p>Mac快捷键中主要有四个修饰键，分别是Command，Control，Option和Shift。这四个键分别有自己的图案，他们经常出现在Mac应用程序中的菜单栏里，方便你随时学习新的快捷键。</p>','2015-12-03 16:19:00','b57221e6b-c034-421e-9903-f9fc4fcfbab9');

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


# Dump of table others
# ------------------------------------------------------------

DROP TABLE IF EXISTS `others`;

CREATE TABLE `others` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `url` varchar(500) NOT NULL DEFAULT '',
  `title` varchar(200) NOT NULL DEFAULT '',
  `description` varchar(500) DEFAULT NULL,
  `type` int(11) NOT NULL,
  `createDate` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;



# Dump of table questions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `questions`;

CREATE TABLE `questions` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(500) NOT NULL DEFAULT '',
  `answer` int(11) DEFAULT NULL,
  `note` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;



# Dump of table questions_options
# ------------------------------------------------------------

DROP TABLE IF EXISTS `questions_options`;

CREATE TABLE `questions_options` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `text` varchar(200) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
