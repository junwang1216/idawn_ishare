var express = require('express');

// routes
var router_root = express.Router();
var router_articles = express.Router();
var router_photo = express.Router();
var router_about = express.Router();
var router_contact = express.Router();
var router_comment = express.Router();
var router_mottos = express.Router();
var router_ext = express.Router();

// controllers
var index_controller = require('./index_controller');
var articles_controller = require('./articles_controller');
var photo_controller = require('./photo_controller');
var about_controller = require('./about_controller');
var contact_controller = require('./contact_controller');
var comment_controller = require('./comment_controller');
var ext_controller = require('./ext_controller');

/*首页*/
//render
router_root.get('/', index_controller.render_index);
router_root.get('/img/:uuid/:name', index_controller.show_image);
router_mottos.get('/mt_:name', index_controller.show_motto);

/*博客*/
//render
router_articles.get('/', articles_controller.render_index);
router_articles.get('/art_:id', articles_controller.render_articles);

/*照片*/
//render
router_photo.get('/', photo_controller.render_index);
router_photo.get('/alb_:id', photo_controller.render_album);
router_photo.get('/alb_:id/ph_:name', photo_controller.show_photo);

/*关于我*/
//render
router_about.get('/', about_controller.render_index);

/*联系*/
//render
router_contact.get('/', contact_controller.render_index);

/*评论*/
//render
router_comment.get('/ct_:id', comment_controller.show_comments);
router_comment.post('/submit.:format?', comment_controller.submit_comment);

/*其他*/
//render
router_ext.get('/list', ext_controller.render_list);
router_ext.get('/questions', ext_controller.render_questions);

// exports
exports.root = router_root;
exports.articles = router_articles;
exports.photo = router_photo;
exports.about = router_about;
exports.contact = router_contact;
exports.comment = router_comment;
exports.mottos = router_mottos;
exports.ext = router_ext;
