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
    }
}

var GoodsModel = mongoose.model('Good',GoodsSchema);

var aaa = new GoodsModel({
    goods_name:"Wilson Ultra 100 网球拍",
    goods_img:"http://cdnimg.taimo.cn/product/1579_450.jpg",
    goods_thumb:"http://cdnimg.taimo.cn/product/1579_120.jpg",
    goods_number:1000,
    market_price:1999,
    shop_price:1400,
    is_new:true,
    is_hot:false,
    goods_brief:"2016年新款",
    sale_number:10,
    goods_type:"2016款",
    goods_desc:"<p>全球最细的球拍，搭配威力三角系统，瞬间绝杀，林丹同款</p><p><img src='http://cdnimg.taimo.cn/des/1603/a.jpg'></p><p><img src='http://cdnimg.taimo.cn/des/1603/b.jpg'></p><p><img src='http://cdnimg.taimo.cn/des/1603/c.jpg'></p>",
    goods_attr:[{attr_name:"拍柄",attr_value:["2号柄"]}],
    goods_brand:"Wilson",
    goods_para:[{para_name:"排面大小",para_value:"95"},{para_name:"空拍重量",para_value:"320"},{para_name:"平衡点",para_value:"5点头轻"}]
});
module.exports = GoodsModel;

