var express = require('express');
var router = express.Router();
var goods = require('../controllers/goods');
var category = require('../controllers/category');

/* GET home page. */
router.get('/goods/:gid', goods.detail);
router.get('/category',category.category);

module.exports = router;
