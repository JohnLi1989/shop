/**
 * Created by john on 16/4/16.
 */
var GoodsModel = require('../models/goods');
var eventproxy = require('eventproxy');
exports.detail = function(req,res){
    var gid = req.params.gid;
    var ep = new eventproxy();
    ep.on('goods_success',function(goods){
       res.render('detail',{goods:goods});
    });
    GoodsModel.getDetail(gid,function(err,goods){
        goods.discount = (goods.shop_price/goods.market_price*10).toFixed(1);
        ep.emit('goods_success',goods);
    });

}

exports.list = function(req,res){
    var type = req.params.type;
    var ep = new eventproxy();
    ep.on('list_success',function(goods){
        res.render('list',{goods:goods});
    });
    var count = 10 ;
    var option = {limit:count};
    GoodsModel.getGoodsList(type,option,function(err,goods){
        ep.emit('list_success',goods);
    });
}