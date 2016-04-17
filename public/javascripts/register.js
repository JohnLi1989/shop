/**
 * Created by john on 16/4/17.
 */

var _mobileMap = new Object();

var mobilePrompt = {
    isNull:"手机号码不能为空",
    error:{
        beUsed:"该手机号码已注册，请更换其它手机号码",
        badFormat:"不是一个合格的手机号码"
    }
};

var ids = ["mobile","password","smsCode"];

//hide all error field
function focusHideMsg() {
    ids.forEach(function(a) {
        $("#" + a + "Error").html("");
        $("#" + a + "Error").hide();
    });
};
// max and min length
function betweenLength(str, _min, _max) {
    return str.length >= _min && str.length <= _max;
};
function badFormat(str) {
    return new RegExp("^[A-Za-z0-9_\\-\\u4e00-\\u9fa5]+$").test(str);
};
function showError(id, msg) {
    var div = $("#" + id + "Error");
    div.html(msg);
    div.show();
};
function chkMobile() {
    var mobile = $('#mobile').val();
    if (!mobile.trim()) {
        focusHideMsg();
        showError("mobile", mobilePrompt.isNull);
        return false;
    }
    if (!/^1[3578]\d{9}$/.test(mobile)) {
        focusHideMsg();
        showError("mobile",mobilePrompt.error.badFormat);
        return false;
    }
    return true;
};


function validMobile(){
    var mobile = $('#mobile').val();

    if (!mobile.trim()) {
        hideAllError();
        showError("mobile", "手机号码不能为空");
        return false;
    }
    if(!chkMobile()){
        return false;
    }
    if (mobile in _mobileMap) {
        var rs = _mobileMap[mobile];
        if (rs.ret == 2) {
            hideAllError();
            $('#mobileError').html(mobilePrompt.error.beUsed);
            $('#mobileError').show();
            return false;
        } else if (rs.ret == 3){
            hideAllError();
            showError("mobile", mobilePrompt.isNull);
            return false;
        } else if (rs.ret == 1){
            hideAllError();
            showError("mobile", mobilePrompt.error.badFormat);
            return false;
        } else if (rs.ret == 0) {
            hideAllError();
            return false;
        }
    }
    $.ajax({
        'url'  : '/shop/users/checkMobile.do',
        'data' : {
            "mobile" : mobile
        },
        "type": 'POST',
        "dataType" : "json",
        success : function(data) {
            if (data.ret>=0) {
                if (data.ret == 2) {
                    hideAllError();
                    $('#mobileError').html(mobilePrompt.error.beUsed);
                    $('#mobileError').show();
                    _mobileMap[mobile] = data;
                    return false;
                }else if(data.ret == 3){
                    hideAllError();
                    showError("mobile", mobilePrompt.isNull);
                    _mobileMap[mobile] = data;
                    return false;
                }else if (data.ret == 1) {
                    hideAllError();
                    showError("mobile", mobilePrompt.error.badFormat);
                    _mobileMap[mobile] = data;
                    return false;
                }else if (data.ret == 0) {
                    hideAllError();
                    _mobileMap[mobile] = data;
                    return true;
                }
            }
            return true;
        }
    });
}

function chkPassword(){
    var password = $('#password').val();
    if(!password.trim()){
        focusHideMsg();
        showError("password","密码不能为空");
        return false;
    }
    if(password.trim().length<6 || password.trim().length>20){
        focusHideMsg();
        showError("password","密码长度必须在6-20个字符之间");
        return false;
    }
    return true;
};
function chkSmsCode(){
    var smsCode = $("#mobile_code").val();
    if(!smsCode.trim()){
        focusHideMsg();
        showError("smsCode","短信验证码不能为空");
        return false;
    }
    return true;
};
function sendSmsCode() {
    validMobile();
    var mobileError = $('#mobileError').html();
    mobileError = mobileError.replace(/[\r\n]/g,"").replace(/[ ]/g,"");
    if(mobileError != ''){
        return false;
    }

    var passwordError = $('#passwordError').html();
    passwordError = passwordError.replace(/[\r\n]/g,"").replace(/[ ]/g,"");
    if(passwordError != ''){
        $('#passwordError').html('');
        $('#passwordError').hide();
    }

    var smsCodeError = $('#smsCodeError').html();
    smsCodeError = smsCodeError.replace(/[\r\n]/g,"").replace(/[ ]/g,"");
    if(smsCodeError != ''){
        return false;
    }
    if($("#error").length>0 && $("#error").html()!=''){
        $("#error").html('');
        $("#error").hide();
    }
    var mobile = $('#mobile').val();
    $.ajax({
        'url' : "/user/alidayu",
        'data' : {'mobile':mobile},
        "type" :'POST',
        "dataType" : "json",
        success : function(data) {
            console.log(data);
            hideAllError();
            if (!data.error_response) {
                    $("#sub_btn").hide();
                    $('#second').html('\u91cd\u65b0\u83b7\u53d6(60s)');//
                    $('#second').show();
                    alert_Display("验证码获取成功");
                    var timestamp = new Date().getTime();
                    var interval = setInterval(
                        function() {
                            var left = Math.ceil(60 - (new Date().getTime() - timestamp) / 1000);
                            if (left > 0) {
                                $('#second').html('\u91cd\u65b0\u83b7\u53d6(' + left + '\u79d2)');
                            } else {
                                $("#sub_btn").show();
                                $("#sub_btn").attr("disabled", false);
                                $("#second").html("");
                                $("#second").hide();
                                clearInterval(interval);
                            }
                        }, 1000);
                    return;
            } else {
                $('#sub_btn').removeAttr("disabled");
                $('#smsCodeError').html('获取验证码失败,请检查您的手机号');
                $('#smsCodeError').show();
            }
        }
    });
};
function goBack(uri) {
    window.location.href = uri;
};
function hideAllError(){
    $('#mobileError').html('');
    $('#mobileError').hide();
    $('#passwordError').html('');
    $('#passwordError').hide();
    $('#captchaError').html('');
    $('#captchaError').hide();
    $('#smsCodeError').html('');
    $('#smsCodeError').hide();
    hideErrorMsg();
}
function hideErrorMsg(){
    $("#error").html("");
    $("#error").hide();
}
function initFieldBind(){
    $("#mobile").bind({"focus":function(){
        $('#mobileError').html('');
        $('#mobileError').hide();
        hideErrorMsg();
        if($('#smsCodeError').html()!=''){
            $("#smsCodeError").html("");
            $("#smsCodeError").hide();
        }
    },"blur":function(){
        validMobile();
    }});
    $("#password").bind({"focus":function(){
        hideErrorMsg();
        if($('#passwordError').html().trim()!=''){
            $("#passwordError").html('');
            $("#passwordError").hide();
        }
    },"blur":function(){
        if($(this).val().trim()!=''){
            if($(this).val().length<6||$(this).val().length>20){
                focusHideMsg();
                showError("password","密码长度必须在6-20个字符之间");
            }else{
                $("#passwordError").html('');
                $("#passwordError").hide();
            }
        }else{
            focusHideMsg();
            if($("#error").length>0 && $("#error").html()!=''){
                $("#error").html('');
                $("#error").hide();
            }
            showError("password","密码不能为空");
        }
    }});
    $("#mobile_code").bind({"focus":function(){
        hideErrorMsg();
        if($("#error").length>0 && $("#error").html()!=''){
            $("#error").html('');
            $("#error").hide();
        }
        if($('#smsCodeError').html().trim()!=''){
            $("#smsCodeError").html('');
            $("#smsCodeError").hide();
        }

    },"blur":function(){
        if($(this).val()!=''){
            $("#smsCodeError").html('');
            $("#smsCodeError").hide();
        }
    }});
};

function submitForm(){
    for(var i=0,len=ids.length;i<len;i++){
        var error = $('#'+ids[i]+'Error').html();
        error = error.replace(/[\r\n]/g,"").replace(/[ ]/g,"");
        if(error != ''){
            return false;
        }
    }
    if($("#error").length>0 && $("#error").html()!=''){
        return false;
    }

    if(!chkPassword()){
        return false;
    }
    if(!chkSmsCode()){
        return false;
    }
    $.ajax
};

function result(data, params){
    if(data.msg=="SUCCESS"){
        if(data.ret==1){
            betSuccess5("注册成功!","确认",function(){
                location=data.data;
            },{})
        }else if(data.ret==2){
            betSuccess5("注册且绑定成功!","确认",function(){
                location=data.data;
            },{})
        }
        localStorage.setItem("cart","[]");
    }else{
        if(data.ret==-1){
            $('#mobileError').html('手机号格式不对');//用户名不存在
            $('#mobileError').show();
            return;
        }else if(data.ret==-2){
            $('#smsCodeError').html('验证码不正确');//密码不正确
            $('#smsCodeError').show();
            return;
        }else if(data.ret==-3){
            $('#mobileError').html('手机号已存在');//密码不正确
            $('#mobileError').show();
            return;
        }
    }
}

$(function() {
    focusHideMsg();
    initFieldBind();
    $("#submitForm").click(function() {
        submitForm();
    });
});