var express = require('express');
var router = express.Router();
var goods = require('../controllers/goods');
var category = require('../controllers/category');
var user = require('../controllers/user');
var cart = require('../controllers/cart');
var fav = require('../controllers/fav');
var auth = require('../middlewares/auth');
var address = require('../controllers/address');
var pay = require('../controllers/pay');

var addgoods = require('../scripts/addGoods')
/* GET home page. */
router.get('/goods/:gid', goods.detail); //详情页
router.get('/category',category.category); //分类页
router.post('/category',category.ajaxCategory); //分类接口
router.get('/list/:type',goods.list); //列表页
router.get('/user/reg',function(req,res){res.render('reg')});   //用户注册页
router.post('/user/check',user.checkUser); //检测是否注册
router.post('/user/reg',user.register);  //提交注册
router.post('/user/alidayu',user.sendSmsCode); //发送短信验证码;
router.get('/user/login',function(req,res){res.render('login')}); //登录页
router.post('/user/login',user.login); //登录
router.get('/shopcart',auth.requireLogin,cart.cartList); //购物车页
router.post('/cart/addToCart',cart.addToCart); //加入购物车
router.post('/cart/delFromCart',cart.delFromCart);  //从购物车移除
router.post('/cart/modifyGoodsNumber',cart.modifyGoodsNumber); //修改商品数量
router.get('/favorite',auth.requireLogin,fav.favList); //收藏夹页
router.post('/fav/addToFav',fav.addToFav); //加入收藏
router.post('/fav/delFromFav',fav.delFromFav);  //取消收藏
router.get('/user/me',auth.requireLogin,user.info); //用户页
router.get('/user/address',auth.requireLogin,address.addressList); //用户地址
router.post('/address/editAddress',address.editAddress); //新增或修改地址
router.post('/address/getAddress',address.getAddress); //修改前得到地址
router.get('/order',auth.requireLogin,function(req,res){res.render('order')}); //订单列表页
router.post('/pay/addToPay',pay.addToPay);  //点击购买后生成购买信息
router.get('/pay/:pid',auth.requireLogin,pay.getPay);  //获取购买信息
router.get('/',function(req,res){res.render('index')}); //首页


router.get('/admin/addgoods',addgoods.addGoods)

module.exports = router;
