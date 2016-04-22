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
    }
}

var GoodsModel = mongoose.model('Good',GoodsSchema);

var aaa = new GoodsModel({
    goods_name:"Wilson ProStaff 1 网球拍",
    goods_img:"http://cdnimg.taimo.cn/product/1577_450.jpg",
    goods_thumb:"http://cdnimg.taimo.cn/product/1577_120.jpg",
    goods_number:1000,
    market_price:2380,
    shop_price:1120,
    is_new:false,
    is_hot:false,
    goods_brief:"测试产品1",
    sale_number:50,
    goods_type:"ProStaff系列",
    goods_desc:"<p>独特配置，减轻重量后的全新Prestige S使网球选手感受着这一系列所带来的与众不同的球场操控体验。305克的重量适合大多数业余选手，实现攻击型打法与精准落点的完美平衡。</p><p><img src='http://cdnimg.taimo.cn/des/1603/a.jpg'></p><p><img src='http://cdnimg.taimo.cn/des/1603/b.jpg'></p><p><img src='http://cdnimg.taimo.cn/des/1603/c.jpg'></p>",
    goods_attr:[{attr_name:"拍柄",attr_value:["2号柄"]}],
    goods_brand:"Wilson",
    goods_para:[{para_name:"排面大小",para_value:"98"},{para_name:"空拍重量",para_value:"305"},{para_name:"平衡点",para_value:"4点头轻"},{para_name:"硬度指数",para_value:"61"}]
});
module.exports = GoodsModel;

