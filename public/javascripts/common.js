/**
 * Created by john on 16/4/16.
 */


//获取链接里的参数
function getUrlParameterByName(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
        results = regex.exec(location.search);
    return results === null ? '': decodeURIComponent(results[1].replace(/\+/g, ' '))
}

//登录
function reLogin(){
    var openid=getUrlParameterByName("openid");
    var uri2 = window.location.href.split("#")[0];
    var path = uri2.split("?")[0];
    var query = uri2.split("?")[1];
    uri3 = path + (query ? ("?" + encodeURI(query)) : "");
    var uri2="http://www.taimo.cn/2015/open.php?rurl="+encodeURIComponent(uri3);
    if(openid==""||openid==null||openid==undefined){
        location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3399d58ba73af906&redirect_uri="+encodeURIComponent(uri2)+"&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect";
    }
}

function isWeiXin(){
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        return true;
    }else{
        return false;
    }
}

//ajax 提交参数获取数据
function postapi4(url,mtparmas) {
    $.ajax({
        type :"POST",
        url:url,
        data:mtparmas,
        success: function (data) {
            if(data=='loseSession'){
                alert_Display("页面已过期");
                setTimeout(function(){
                    location=location;
                },1500);
            }else{
                hdsuccess(data);
            }
        },
        error: function (data) {
            if(data.responseText=='loseSession'){
                alert_Display("页面已过期");
                setTimeOut(function(){
                    location=location;
                },1500);
            }
        }
    });
}

var arr=['/shop/users/toLogin.do','/shop/users/toRegister.do','/shop/users/checkMobile.do','/shop/users/getSms.do',
    '/shop/goods/goodsDetailAjax.do','/shop/goods/goodsListAjax.do'];

//ajax带回调函数提交数据
//ajax 提交参数获取数据
/*function postapi(url, mtparmas, callback, extra) {
 var is_weixin=isWeiXin();
 var user_id=extra.user_id;
 var uri2 = window.location.href.split("#")[0];
 var path = uri2.split("?")[0];
 var query = uri2.split("?")[1];
 uri3 = path + (query ? ("?" + encodeURI(query)) : "");
 if(in_array(url,arr)){
 $.ajax({
 type :"POST",
 url:url,
 data:mtparmas,
 success: function (data) {
 if(data=='loseSession'){
 alert_Display("页面已过期");
 setTimeout(function(){
 location=location;
 },1500);
 }else{
 callback(data, extra);
 }
 },
 error: function (data) {
 console.log(data);
 if(data.responseText=='loseSession'){
 alert_Display("页面已过期");
 setTimeOut(function(){
 location=location;
 },1500);
 }
 }
 });
 }else{
 if(user_id==""||user_id==null){
 if(is_weixin){
 var host="http://"+location.host;
 var uri2="http://www.taimo.cn/2015/open.php?rurl="+encodeURIComponent(host+"/shop/users/login.do?rurl="+encodeURIComponent(uri3));
 location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3399d58ba73af906&redirect_uri="+encodeURIComponent(uri2)+"&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect";
 }else{
 var host="http://"+location.host;
 var uri2=host+"/shop/users/login.do?rurl="+encodeURIComponent(uri3);
 location.href=uri2;
 }
 }else{
 $.ajax({
 type :"POST",
 url:url,
 data:mtparmas,
 success: function (data) {
 if(data=='loseSession'){
 alert_Display("页面已过期");
 setTimeout(function(){
 location=location;
 },1500);
 }else{
 callback(data, extra);
 }
 },
 error: function (data) {
 console.log(data);
 if(data.responseText=='loseSession'){
 alert_Display("页面已过期");
 setTimeOut(function(){
 location=location;
 },1500);
 }
 }
 });
 }
 }
 }*/

/*function postapi(url, mtparmas, callback, extra) {
 $.ajax({
 type :"POST",
 url:url,
 data:mtparmas,
 success: function (data) {
 if(data=='loseSession'){
 alert_Display("页面已过期");
 setTimeout(function(){
 location=location;
 },1500);
 }else{
 callback(data, extra);
 }
 },
 error: function (data) {
 console.log(data);
 if(data.responseText=='loseSession'){
 alert_Display("页面已过期");
 setTimeOut(function(){
 location=location;
 },1500);
 }
 }
 });
 }*/
function postapi(url, mtparmas, callback, extra) {
    $.ajax({
        type :"POST",
        url:url,
        data:mtparmas,
        success: function (data) {
            //data=eval("("+data+")");
            if(data.ret == undefined){
                data=eval("("+data+")");
            }
            if(data.ret==13){
                checkLogin();
            }else{
                callback(data, extra);
            }
        },
        error: function (data) {
            console.log(data);
            if(data.responseText=='loseSession'){
                alert_Display("页面已过期");
                setTimeOut(function(){
                    location=location;
                },1500);
            }
        }
    });
}
function checkLogin(){
    var is_weixin=isWeiXin();
    var uri2 = window.location.href.split("#")[0];
    var path = uri2.split("?")[0];
    var query = uri2.split("?")[1];
    uri3 = path + (query ? ("?" + encodeURI(query)) : "");
    if(is_weixin){
        var host="http://"+location.host;
        var uri2="http://www.taimo.cn/2015/open.php?rurl="+encodeURIComponent(host+"/shop/users/login.do?rurl="+encodeURIComponent(uri3));
        location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3399d58ba73af906&redirect_uri="+encodeURIComponent(uri2)+"&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect";
    }else{
        var host="http://"+location.host;
        var uri2=host+"/shop/users/login.do?rurl="+encodeURIComponent(uri3);
        location.href=uri2;
    }
}

//时间格式转换
function getLocalTime(nS) {
    var time = new Date(nS);
    return time.getFullYear() + "年" + (time.getMonth() + 1) + "月" + time.getDate() + "日 " + time.getHours() + "点" + time.getMinutes() + "分";
}

//跳转
function raceDetail(raceId){
    location.href="/tm/index/detail.do?yueId="+raceId;
}
//修改
function editDetail(raceId){
    location.href="/tm/index/createActivity.do?yueId="+raceId;
}

//时间格式转换2
function DateDiff(date) {
    var result;
    var diff = (Date.now() / 1000 - date);
    result = parseInt(diff) + "秒";
    if (diff > 60 * 60 * 24 * 31 * 12) {
        result = parseInt(diff / (60 * 60 * 24 * 31 * 12)) + "年";
    } else if (diff > 60 * 60 * 24 * 31) {
        result = parseInt(diff / (60 * 60 * 24 * 31)) + "个月";
    } else if (diff > 60 * 60 * 24) {
        result = parseInt(diff / (60 * 60 * 24)) + "天";
    } else if (diff > 60 * 60) {
        result = parseInt(diff / (60 * 60)) + "小时";
    } else if (diff > 60) {
        result = parseInt(diff / 60) + "分钟";
    }

    return result;
}

// 跳转到详细页面
function raceDetail(raceId,createrOpenId){
    /*if(createrOpenId==openid){
     location.href="/tm/index/mydetail.do?yueId="+raceId;
     }else{
     location.href="/tm/index/detail.do?yueId="+raceId;
     }*/
    location.href="/tm/index/detail.do?yueId="+raceId;
}

//设置状态
function setStatus(status,peoplenum,signedPeopleNum){
    if(status==0){
        $("#status").val("报名中");
    }else if(status==1){
        $("#status").val("停止报名");
    }else if(status==2){
        $("#status").val("已结束");
    }
}
//引导分享
/*$("#share").on("tap",function(){
 $("#share").removeClass("in");
 });*/

//跳到我的详细页面
function raceMyDetail(raceId){
    //location.href="/tm/index/mydetail.do?yueId="+raceId;
    location.href="/tm/index/detail.do?yueId="+raceId;
}

//提示框
function alert_Show(title,content,yes,url){
    html = '<div class="alert_bg"><div class="alert"><div class="title c">'+title+'</div><div class="alert_content">'+content+'</div><div class="bar"> <a href="javascript:void(0);" class="bar_bt_100" onClick="alert_close_url(this,\''+url+'\')">'+yes+'</a></div></div></div>';
    $(".alert_bg").remove();
    $("body").append(html);
}
//仿安卓信息提示
function alert_Display(content){
    html = '<div class="new_simple_tips"><div class="new_tips_for_messages"><span>'+content+'</span></div></div>';
    $("body").append(html);
    $(".new_simple_tips").show();
    setTimeout(function(){$(".new_simple_tips").fadeOut();$(".new_simple_tips").eq(0).remove()}, 2000);
}

function alert_close_url(t,url){
    $(t).parent().parent().fadeOut();
    $(".alert_bg").remove();

    if(url!=''){
        location.href=url;
    }
}

function alert_close(t){
    $(t).parent().parent().fadeOut();
    $(".alert_bg").remove();
}

function alert_Yes_No(title,content,no,yes,click_func){
    html = '<div class="alert_bg"><div class="alert"><div class="title c">'+title+'</div><div class="alert_content">'+content+'</div><div class="bar"><a href="javascript:void(0);" onClick="alert_close(this)" class="bar_bt_50 bar_a">'+no+'</a> <a href="javascript:void(0);" onClick="'+click_func+'(this)" class="bar_bt_50 submit_bt">'+yes+'</a></div></div></div>';
    $(".alert_bg").remove();
    $("body").append(html);
}

//操作成功-信息提示
function betSuccess(title,body,foot,func){
    $("body").append('<div class="k-modal" id="jq_modal" style="display:none;"><div class="k-modal-dialog"><div class="k-modal-content"><div class="k-modal-header"><h4 class="k-modal-title"></h4></div><div id="jq_km_bd"></div><div id="jq_km_ft"></div></div></div></div>');
    $("#jq_modal").hide();
    $("#jq_modal").dialog({
        dialogTitle: title,
        dialogBody: '<p class="tac"><span class="icon_laststep"></span></p><p class="fs36 tac mt10">'+body+'</p>',
        dialogFoot: '<button class="k-btn k-btn-danger k-btn-block k-jq_closeModal">'+foot+'</button>',
        callbackFunc:func,
        callbackFunc2:null
    });
}
//含有2个按钮的弹出层
function betSuccess2(title,body,foot1,foot2,func1,func2,prams){
    $("body").append('<div class="k-modal" id="jq_modal" style="display:none;"><div class="k-modal-dialog"><div class="k-modal-content"><div class="k-modal-header"><h4 class="k-modal-title"></h4></div><div id="jq_km_bd"></div><div id="jq_km_ft"></div></div></div></div>');
    $("#jq_modal").hide();
    $("#jq_modal").dialog({
        dialogTitle: title,
        dialogBody: '<p class="tac"><span class="icon_laststep"></span></p><p class="fs36 tac mt10">'+body+'</p>',
        dialogFoot: '<button class="k-btn k-btn-danger k-btn-block k-jq_successModal">'+foot1+'</button><button class="k-btn k-btn-danger k-btn-block k-jq_closeModal">'+foot2+'</button>',
        canshu: prams,
        callbackFunc: func1 ,
        callbackFunc2 : func2
    });
}
//含有2个按钮感叹号的弹出层
function betSuccess3(title,body,foot1,foot2,func1,func2,prams){
    $("body").append('<div class="k-modal" id="jq_modal" style="display:none;"><div class="k-modal-dialog"><div class="k-modal-content"><div id="jq_km_bd"></div><div id="jq_km_ft"></div></div></div></div>');
    $("#jq_modal").hide();
    $("#jq_modal").dialog({
        dialogTitle: title,
        dialogBody: '<div class="gantan"><img src="../images/dialog_icon.png"></div><p class="fs36 tac mt10 tc">'+body+'</p>',
        dialogFoot: '<button class="k-btn k-btn-danger k-btn-block k-jq_successModal">'+foot1+'</button><button class="k-btn k-btn-danger k-btn-block k-jq_closeModal">'+foot2+'</button>',
        canshu: prams,
        callbackFunc: func1 ,
        callbackFunc2 : func2
    });
}
//含有1个按钮感叹号的弹出层
function betSuccess4(title,body,foot,func,prams){
    $("body").append('<div class="k-modal" id="jq_modal" style="display:none;"><div class="k-modal-dialog"><div class="k-modal-content"><div id="jq_km_bd"></div><div id="jq_km_ft"></div></div></div></div>');
    $("#jq_modal").hide();
    $("#jq_modal").dialog({
        dialogTitle: title,
        dialogBody: '<div class="gantan"><img src="../images/dialog_icon_gou.png"></div><p class="fs36 tac mt10 tc">'+body+'</p>',
        dialogFoot: '<button class="k-btn k-btn-danger k-btn-block k-jq_closeModal" style="width:96%">'+foot+'</button>',
        canshu: prams,
        callbackFunc: func ,
        callbackFunc2 : null
    });
}
//含有1个按钮感叹号的弹出层
function betSuccess5(body,foot,func,prams){
    $("body").append('<div class="k-modal" id="jq_modal" style="display:none;"><div class="k-modal-dialog"><div class="k-modal-content"><div id="jq_km_bd"></div><div id="jq_km_ft"></div></div></div></div>');
    $("#jq_modal").hide();
    $("#jq_modal").dialog({
        dialogTitle: null,
        dialogBody: '<div class="gantan"><img src="../images/dialog_icon.png"></div><p class="fs36 tac mt10 tc">'+body+'</p>',
        dialogFoot: '<button class="k-btn k-btn-danger k-btn-block k-jq_closeModal" style="width:96%">'+foot+'</button>',
        canshu: prams,
        callbackFunc: func ,
        callbackFunc2 : null
    });
}
//获取时间
function GetDateStr(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = dd.getMonth()+1;//获取当前月份的日期
    var d = dd.getDate();
    if(m<10){
        m = "0"+m;
    }
    if(d<10){
        d = "0"+d;
    }
    return y+"-"+m+"-"+d;
}
//时间格式化
dateFormat = function (date, format) {

    date = new Date(date);

    var o = {
        'M+' : date.getMonth() + 1, //month
        'd+' : date.getDate() , //day
        'H+' : date.getHours() , //hour
        'm+' : date.getMinutes(), //minute
        's+' : date.getSeconds(), //second
        'q+' : Math.floor((date.getMonth() + 3) / 3), //quarter
        'S' : date.getMilliseconds() //millisecond
    };

    if (/(y+)/.test(format))
        format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));

    for (var k in o)
        if (new RegExp('(' + k + ')').test(format))
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));

    return format;
}

//下拉框选择事件
/*$(".selects").change(function(){
 v = $(this).find("option:selected").text();
 $(this).prev(".input_bg").html(v);

 })*/

function in_array(stringToSearch, arrayToSearch) {
    for (s = 0; s < arrayToSearch.length; s++) {
        thisEntry = arrayToSearch[s].toString();
        if (thisEntry == stringToSearch) {
            return true;
        }
    }
    return false;
}
