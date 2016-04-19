/**
 * Created by john on 16/4/19.
 */
/**
 * Created by john on 16/4/18.
 */
var GoodsModel = require('../models/goods');
var FavModel = require('../models/fav');

exports.addToFav = function(req,res){
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
        GoodsModel.getByGoodsId(goods_ids,function(err,goods){
            if(goods){
                res.render('favorite',{goods:goods});
            }
        });
    });
}
exports.delFromFav = function(req,res){
    var goods_ids = req.body.goods_ids.split(',');
    var user_id = req.session.user._id;
    FavModel.delGoods(user_id,goods_ids,function(err,result){
        if(result){
            res.json({msg:"SUCCESS"});
        }
    });
}