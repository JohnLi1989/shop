/**
 * Created by john on 16/4/16.
 */
var GoodsModel = require('../models/goods');
var CartModel = require('../models/cart');
var FavModel = require('../models/favorite');
var eventproxy = require('eventproxy');
exports.detail = function(req,res){
    var gid = req.params.gid;
    var ep = new eventproxy();
    if(req.session.user){
        ep.all('goods_success','count_success',function(goods,count){
            res.render('detail',{goods:goods,count:count});
        });
    }else{
        ep.on('goods_success',function(goods){
            res.render('detail',{goods:goods,count:0});
        });
    }
    GoodsModel.getDetail(gid,function(err,goods){
        goods.discount = (goods.shop_price/goods.market_price*10).toFixed(1);
        ep.emit('goods_success',goods);
    });
    if(req.session.user){
        var uid = req.session.user._id;
        CartModel.count({goods_id:gid,user_id:uid},function(err,count){
            ep.emit('count_success',count);
        });
    }
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


