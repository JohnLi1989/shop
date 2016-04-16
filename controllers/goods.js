/**
 * Created by john on 16/4/16.
 */
var GoodsModel = require('../models/goods');
var eventproxy = require('eventproxy');
exports.detail = function(req,res){
    var gid = req.params.gid;
    var ep = new eventproxy();
    ep.all('goods_success',function(goods){
       res.render('detail',{goods:goods});
    });
    GoodsModel.getDetail(gid,function(err,goods){
        goods.discount = (goods.shop_price/goods.market_price*10).toFixed(1);
        console.log(goods);
        ep.emit('goods_success',goods);
    })
}