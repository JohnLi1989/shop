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

//ajax 提交参数获取数据

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

//时间格式转换
function getLocalTime(nS) {
    var time = new Date(nS);
    return time.getFullYear() + "年" + (time.getMonth() + 1) + "月" + time.getDate() + "日 " + time.getHours() + "点" + time.getMinutes() + "分";
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


function in_array(stringToSearch, arrayToSearch) {
    for (s = 0; s < arrayToSearch.length; s++) {
        thisEntry = arrayToSearch[s].toString();
        if (thisEntry == stringToSearch) {
            return true;
        }
    }
    return false;
}
