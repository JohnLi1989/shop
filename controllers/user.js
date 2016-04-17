/**
 * Created by john on 16/4/17.
 */
var crypto = require('crypto');
var Alidayu = require('alidayu-node');
var UserModel = require('../models/user');
exports.sendSmsCode = function(req,res){
    var ali = new Alidayu("23347119","e6b36b511dd5391eb8f099e9bcb7fc98");
    var mobile = req.query.mobile;
    console.log(mobile);
    ali.smsSend({
        sms_free_sign_name: '注册验证', //短信签名，参考这里 http://www.alidayu.com/admin/service/sign
        sms_param: JSON.stringify({"code": "123456", "product": "测试网站"}),//短信变量，对应短信模板里面的变量
        rec_num: mobile, //接收短信的手机号
        sms_template_code: 'SMS_7755648' //短信模板，参考这里 http://www.alidayu.com/admin/service/tpl
    },function(err,result){
        if(err){
            res.json(err);
        }else{
            res.json(result);
        }
    });
}
exports.checkUser = function(req,res,next){
    var mobile = req.query.mobile;
}
exports.register = function(req,res){
    var mobile = req.query.mobile;
    var pass = req.query.pass;
    var reg_time = Date.now();

    var md5 = crypto.createHash('md5');
    var new_pass = md5.update(pass).digest('base64');
}