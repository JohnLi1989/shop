/**
 * Created by john on 16/4/17.
 */
var crypto = require('crypto');
var Alidayu = require('alidayu-node');
var UserModel = require('../models/user');
exports.sendSmsCode = function(req,res){
    var ali = new Alidayu("23347119","e6b36b511dd5391eb8f099e9bcb7fc98");
    var mobile = req.body.mobile;
    var code = parseInt(Math.random()*8999+1000).toString();
    req.session.smscode = code;
    ali.smsSend({
        sms_free_sign_name: '注册验证', //短信签名，参考这里 http://www.alidayu.com/admin/service/sign
        sms_param: JSON.stringify({"code": code, "product": "测试网站"}),//短信变量，对应短信模板里面的变量
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
    var mobile = req.body.mobile;
    var pass = req.body.pass;
    var smscode = req.body.smscode;
    var code = req.session.smscode;
    var reg_time = Date.now();
    console.log(mobile+'...'+smscode +',,,'+code);
    var md5 = crypto.createHash('md5');
    var new_pass = md5.update(pass).digest('base64');

    if(smscode!==code){
        return res.json({msg:"ERROR",ret:-2});
    }
    UserModel.getUser(mobile,function(err,users){
       if(users.length>0){
           return res.json({msg:"ERROR",ret:-1});
       }
        var user = {mobile:mobile,pass:new_pass,reg_time:reg_time};
        UserModel.createUser(user,function(err,result){
            if(result){
                res.json({msg:"SUCCESS",reg:1});
            }
        });
    });

    
}