var express = require('express');
var router = express.Router();
var goods = require('../controllers/goods');
var category = require('../controllers/category');
var user = require('../controllers/user');
/* GET home page. */
router.get('/goods/:gid', goods.detail); //详情页
router.get('/category',category.category); //分类页
router.post('/category',category.ajaxCategory); //分类接口
router.get('/list/:type',goods.list); //列表页
router.get('/user/reg',function(req,res){res.render('reg')});   //用户注册页
router.post('/user/reg');  //提交注册
router.post('/user/alidayu',user.sendSmsCode); //发送短信验证码;
module.exports = router;
