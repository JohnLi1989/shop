/**
 * Created by john on 16/4/16.
 */
var mongoose = require('mongoose');
var CategorySchema = new mongoose.Schema({
    cat_name : String, //分类名
    root : String, //一级
    second : String, //二级
    third : String, //三级
    cat_img : String //三级分类的图片
});

CategorySchema.statics = {
    getRootCategory : function(cb){
        this.find({"second":{$exists:false}},cb);
    },
    getChildCategory : function(cat,cb){
        this.find({"root":cat},cb);
    }

}

var CategoryModel = mongoose.model('Category',CategorySchema);

var bbb = new CategoryModel({
    cat_name:"Wilson",
    root:"网球拍",
    second : "Wilson",
    third : "2016款",
    cat_img : "http://cdnimg.taimo.cn/product/1579_120.jpg"
});
module.exports = CategoryModel;