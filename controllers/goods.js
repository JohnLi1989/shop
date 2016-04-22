/**
 * Created by john on 16/4/16.
 */
var GoodsModel = require('../models/goods');
var CartModel = require('../models/cart');
var FavModel = require('../models/fav');
var eventproxy = require('eventproxy');
exports.detail = function(req,res){
    var gid = req.params.gid;
    var ep = new eventproxy();
    if(req.session.user){
        ep.all('goods_success','count_success','fav_success',function(goods,count,result){
            res.render('detail',{goods:goods,count:count,result:result});
        });
    }else{
        ep.on('goods_success',function(goods){
            res.render('detail',{goods:goods,count:0,result:null});
        });
    }
    GoodsModel.getDetail(gid,function(err,goods){
        goods.discount = (goods.shop_price/goods.market_price*10).toFixed(1);
        ep.emit('goods_success',goods);
    });
    if(req.session.user){
        var uid = req.session.user._id;
        CartModel.count({user_id:uid},function(err,count){
            ep.emit('count_success',count);
        });
        FavModel.getOneGoods({goods_id:gid,user_id:uid},function(err,result){
               ep.emit('fav_success',result);
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


