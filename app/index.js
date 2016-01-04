process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var path = require('path');
var express = require('express');
var session = require('express-session');
var hbs = require('express-hbs');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var i18n = require("i18n");
var log4js = require('log4js');

var controllers = require('./controllers');
var helpers = require('./helpers');
var config = require('../config');

var app = express();

console.log("当前运行方式：", app.get('env'));

log4js.configure(config.log4js, {});
i18n.configure(config.i18n);

app.use(i18n.init);
app.use(log4js.connectLogger(log4js.getLogger("http"), {
    level : 'auto'
}));

// Global values
app.locals = {
    version         : config.application.version,
    title           : config.application.title,
    subtitle        : config.application.subtitle,
    keywords        : config.application.keywords,
    description     : config.application.description,
    author          : config.application.author,
    page_name       : 'home',
    hide_navbar     : false,
    messages        : [],
    settings        : {}
};

// view engine setup
app.engine('hbs', hbs.express3({
    viewsDir    : path.join(__dirname, 'views'),
    partialsDir : path.join(__dirname, 'views/partials'),
    layoutsDir  : path.join(__dirname, 'views/layouts')
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))
// parse application/json
app.use(bodyParser.json())
app.use(cookieParser(config.session.secret));

/*app.use(session({
    name              : config.session.name,
    resave            : false,
    secret            : config.session.secret,
    saveUninitialized : false
}));*/

app.use(require('less-middleware')(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../public')));
app.use(favicon(path.join(__dirname, '../public/favicon.ico')));


// 路由映射
app.use('/', controllers.root);
app.use('/articles', controllers.articles);
app.use('/photo', controllers.photo);
app.use('/about', controllers.about);
app.use('/contact', controllers.contact);
app.use('/comment', controllers.comment);
app.use('/mottos', controllers.mottos);
app.use('/ext', controllers.ext);

module.exports = app;
