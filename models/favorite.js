/**
 * Created by john on 16/4/18.
 */
var mongoose = require('mongoose');
var FavoriteSchema = new mongoose.Schema({
    user_id:String,
    goods_id:String
});

FavoriteSchema.statics = {
    getGoods : function(){

    },
    delGoods : function(){

    },
    addGoods : function(){

    }
}

var FavoriteModel = mongoose.model('Favorite',FavoriteSchema);

module.exports = FavoriteModel;