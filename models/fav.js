/**
 * Created by john on 16/4/19.
 */
var mongoose = require('mongoose');
var FavSchema = new mongoose.Schema({
    user_id:String,
    goods_id:String
});

FavSchema.statics = {
    getGoods : function(fav,cb){
        this.find(fav,cb);
    },
    delGoods : function(user_id,goods_id,cb){
        this.remove({user_id:user_id,goods_id:goods_id},cb);
    },
    addGoods : function(user_id,goods_ids,cb){
        this.create({user_id:user_id,goods_id:goods_ids},cb);
    },
    getOneGoods : function(fav,cb){
        this.findOne(fav,cb);
    }
}

var FavModel = mongoose.model('Fav',FavSchema);

module.exports = FavModel;