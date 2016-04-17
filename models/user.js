/**
 * Created by john on 16/4/17.
 */
var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    mobile : Number,   //登录用
    pass : String,      //密码
    reg_time : Date     //注册时间

});

var UserModel = mongoose.model('User',UserSchema);

module.exports = UserModel;