/**
 * Created by john on 16/4/17.
 */

function subLoginForm(){
    var loginName = $.trim($('#loginName').val());
    var password = $.trim($('#password').val());
    if(loginName.length==0){
        $('#loginNameError').html('手机号不能为空');
        $('#loginNameError').show();
        return;
    }
    if(password.length==0){
        $('#passwordError').html('密码不能为空');
        $('#passwordError').show();
        return;
    }
    $.ajax({
        'url'  : '/user/login',
        'data' : {"mobile" : loginName,"pass":password},
        "type": 'POST',
        "dataType" : "json",
        success : function(data) {
            console.log(data);
            if(data.msg=="SUCCESS"){
                betSuccess5("登录成功!","确认",function(){
                    location="/shopcart";
                },{});
            }else if(data.ret==-1){
                $('#loginNameError').html('用户名不存在');//用户名不存在
                $('#loginNameError').show();
            }else if(data.ret==-2){
                $('#passwordError').html('密码不正确');//密码不正确
                $('#passwordError').show();
            }
        }
    });
}
/**
 * 页面初始化操作
 */
$(function(){
    $('#tel').bind('blur',function(){
        hideAllError();
        chkMobile();
    });
});

function hideError(){
    $('#error').html('');
    $('#error').hide();
}
function hideAllError(){
    $('#loginNameError').html('');
    $('#loginNameError').hide();
    $('#telError').html('');
    $('#telError').hide();
    $('#passwordError').html('');
    $('#passwordError').hide();
    $('#captchaError').html('');
    $('#captchaError').hide();
    $('#smsCodeError').html('');
    $('#smsCodeError').hide();
    hideError();
}
$(function(){
    $('#loginName').bind('focus',function(){
        $('#loginNameError').html('');
        $('#loginNameError').hide();
        hideError();
    });
    $('#loginName').bind('blur',function(){
        $('#loginNameError').html('');
        $('#loginNameError').hide();
        hideError();
    });
    $('#tel').bind('focus',function(){
        $('#telError').html('');
        $('#telError').hide();
        hideError();
    });
    $('#password').bind('focus',function(){
        $('#passwordError').html('');
        $('#passwordError').hide();
        hideError();
    });
    $('#password').bind('blur',function(){
        $('#passwordError').html('');
        $('#passwordError').hide();
        hideError();
    });
    $('#captcha').bind('focus',function(){
        $('#captchaError').html('');
        $('#captchaError').hide();
        hideError();
    });
    $('#captcha').bind('blur',function(){
        $('#captchaError').html('');
        $('#captchaError').hide();
        hideError();
    });
    $('#smsCode').bind('focus',function(){
        $('#smsCodeError').html('');
        $('#smsCodeError').hide();
        hideError();
    });
    $('#smsCode').bind('blur',function(){
        $('#smsCodeError').html('');
        $('#smsCodeError').hide();
        hideError();
    });
});
