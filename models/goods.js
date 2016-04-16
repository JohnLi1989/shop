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
    is_best : Boolean,
    is_shipping : Boolean,
    goods_brief : String, //商品简介
    sale_number : String, //销量
    goods_type : String, //所属的第三级分类
    goods_desc : String, //商品描述
    goods_attr : [{attr_name:String,attr_value:[String]}], //商品规格
    goods_brand : String, //商品品牌
});

GoodsSchema.statics = {
    getDetail : function(gid,cb){
        this.findONe({_id:gid},cb);
    }
}

var GoodsModel = mongoose.model('Goods',GoodsSchema,'Goods');

module.exports = GoodsModel;

