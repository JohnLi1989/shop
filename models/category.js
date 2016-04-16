/**
 * Created by john on 16/4/16.
 */
var mongoose = require('mongoose');
var CateGorySchema = new mongoose.Schema({
    cat_name : String, //分类名
    root : String, //一级
    second : String, //二级
    third : String //三级
});