var express = require('express');
var router = express.Router();
var goods = require('../controllers/goods');
var category = require('../controllers/category');

/* GET home page. */
router.get('/goods/:gid', goods.detail); //详情页
router.get('/category',category.category); //分类页
router.post('/category',category.ajaxCategory); //分类接口
router.get('/list/:type',goods.list); //列表页

module.exports = router;
