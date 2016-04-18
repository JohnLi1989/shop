/**
 * Created by john on 16/4/18.
 */
var GoodsModel = require('../models/goods');
var CartModel = require('../models/cart');

exports.addToCart = function(req,res){
    var user_id = req.session.user._id;
    var goods_id = req.body.goods_id;
    var cart = {user_id:user_id,goods_id,goods_id};
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
exports.cartList = function(req,res){
    var user_id = req.session.user._id;
    var cart = {user_id:user_id};
    CartModel.getGoods(cart,function(err,goods){
        if(goods.length==0){
            return res.render('shopcart',{goods:''});
        }
        var goods_ids = [];
        for(var k in goods){
            goods_ids.push(goods[k].goods_id);
        }
        GoodsModel.getByGoodsId(goods_ids,function(err,goods){
            if(goods){
                res.render('shopcart',{goods:goods});
            }
        });
    });
}
exports.delFromCart = function(req,res){
    var goods_ids = req.body.goods_ids.split(',');
    var user_id = req.session.user._id;
    console.log(goods_ids);
    CartModel.delGoods(user_id,goods_ids,function(err,result){
       if(result){
           res.json({msg:"SUCCESS"});
       }
    });
}