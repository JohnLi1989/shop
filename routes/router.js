var express = require('express');
var router = express.Router();
var goods = require('../controllers/goods');

/* GET home page. */
router.get('/goods/:gid', goods.detail);

module.exports = router;
