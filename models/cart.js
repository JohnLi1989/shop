/**
 * Created by john on 16/4/18.
 */
var mongoose = require('mongoose');
var CartSchema = new mongoose.Schema({
    user_id:String,
    goods_id:String
});

CartSchema.statics = {
    getGoods : function(cart,cb){
        this.find(cart,cb);
    },
    delGoods : function(user_id,goods_ids,cb){
        this.remove({user_id:user_id,goods_id:goods_ids},cb);
    },
    addGoods : function(cart,cb){
        this.create(cart,cb);
    },
    getOneGoods : function(cart,cb){
        this.findOne(cart,cb);
    }
}

var CartModel = mongoose.model('Cart',CartSchema);

module.exports = CartModel;