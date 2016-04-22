/**
 * Created by john on 16/4/19.
 */
var mongoose = require('mongoose');
var GoodsModel = require('../models/goods');
var FavModel = require('../models/fav');

exports.addToFav = function(req,res){
    if(!req.session.user){
        return res.json({ret:0});
    }
    var user_id = req.session.user._id;
    var goods_ids = req.body.goods_ids.split(',');
    FavModel.addGoods(user_id,goods_ids,function(err,result){
        if(result){
            res.json({ret:1});
        }
    });
}
exports.favList = function(req,res){
    var user_id = req.session.user._id;
    var fav = {user_id:user_id};
    FavModel.getGoods(fav,function(err,goods){
        if(goods.length==0){
            return res.render('favorite',{goods:''});
        }
        var goods_ids = [];
        for(var k in goods){
            goods_ids.push(goods[k].goods_id);
        }
        goods_ids = goods_ids.map(function(item,index){
            return new mongoose.Types.ObjectId(item);
        });
        GoodsModel.getByGoodsId(goods_ids,function(err,goods){
            if(goods){
                res.render('favorite',{goods:goods});
            }
        });
    });
}
exports.delFromFav = function(req,res){
    if(!req.session.user){
        return res.json({ret:0});
    }
    var goods_id = req.body.goods_id;
    var user_id = req.session.user._id;
    FavModel.delGoods(user_id,goods_id,function(err,result){
        if(result){
            res.json({msg:"SUCCESS"});
        }
    });
}