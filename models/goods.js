/**
 * Created by john on 16/4/16.
 */
var mongoose = require('mongoose');
var GoodsSchema = new mongoose.Schema({
    goods_name : String, //商品名
    goods_img : String, //商品图片
    goods_thumb : String, //商品缩略图
    goods_number : Number, //库存
    market_price : Number, //市场价
    shop_price : Number, //销售价
    is_new : Boolean,
    is_hot : Boolean,
    goods_brief : String, //商品简介
    sale_number : {type:Number,default:0}, //销量
    goods_type : String, //所属的第三级分类
    goods_desc : String, //商品描述
    goods_attr : [], //商品规格
    goods_brand : String, //商品品牌
    goods_para :[] //商品参数
});

GoodsSchema.statics = {
    getDetail : function(gid,cb){
        this.findById(gid,cb);
    },
    getGoodsList : function(type,option,cb){
        this.find({goods_type:type},null,option,cb);
    },
    getByGoodsId : function(gids,cb){
        this.find({_id:{$in:gids}},cb);
    },
    addGoods: function (goods,cb) {
        this.create(goods,cb);
    }
}

var GoodsModel = mongoose.model('Good',GoodsSchema);


module.exports = GoodsModel;

