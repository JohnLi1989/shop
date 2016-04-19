/**
 * Created by john on 16/4/17.
 */
var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    mobile : Number,   //登录用
    pass : String,      //密码
    reg_time : Date     //注册时间

});

UserSchema.statics = {
    getUser : function(mobile,cb){
        this.find({mobile:mobile},cb);
    },
    createUser : function(user,cb){
        this.create(user,cb);
    },
    getOneUser:function(mobile,cb){
        this.findOne({mobile:mobile},cb);
    },
    getUserById:function(user_id,cb){
        this.findById(user_id,cb);
    }
}
var UserModel = mongoose.model('User',UserSchema);

module.exports = UserModel;