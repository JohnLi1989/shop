/**
 * Created by john on 16/4/16.
 */
var GoodsModel = require('../models/goods');
var CartModel = require('../models/category');
var FavModel = require('../models/favorite');
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

exports.addToCart = function(req,res){
    if(!req.session.user){
        return res.redirect('/user/login');
    }
    var user_id = req.session.user._id;
    var goods_id = req.body.goods_id;
    var cart = {user_id:user_id,goods_id,goods_id};
    console.log(cart);
    CartModel.getOneGoods(cart,function(err,goods){
       if(goods){
           return res.json({ret:-1});
       }
        CartModel.addGoods(cart,function(err,result){
            if(result){
                res.json({ret:1});
            }
        });
    });
}