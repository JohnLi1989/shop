/**
 * Created by john on 16/4/21.
 */
var buyNum = $('#buyNum').attr('value');
$('#plus').on('click',function(){
    buyNum++;
    $('#buyNum').attr('value',buyNum);
    $('#minus').removeClass('minus_disabled');

});
$('#minus').on('click',function(){
    if(buyNum<1){
        return false;
    }else if(buyNum==1){
        $('#minus').addClass('minus_disabled');
    }else if(buyNum>1){
        buyNum--;
        $('#buyNum').attr('value',buyNum);
    }
});

var width = $(window).width();
$('#detailTab span').each(function(){
    $(this).click(function(){
        var no = $(this).attr('no');
        var height = $('#detail'+no+'').height();
        $(this).addClass('cur');
        $(this).siblings().removeClass('cur');
        $('#detailCont').css({'transform':'translate('+(-(width*no))+'px,0px)','height':height});
    });
});

$("#fav").on('click',function(){
    var goods_id = $(this).attr('goodsid');
    if(!$(this).hasClass("btn_fav_checked")){
        $.ajax({
            url:'/fav/addToFav',
            data:{goods_ids:goods_id},
            type:'post',
            dataType:'json',
            success:function(d){
                $('#fav').addClass("btn_fav_checked");
                alert_Display("收藏成功");
            }
        });
    }else{
        $.ajax({
            url:'/fav/delFromFav',
            data:{goods_ids:goods_id},
            type:'post',
            dataType:'json',
            success:function(d){
                $('#fav').removeClass("btn_fav_checked");
                alert_Display("取消成功");
            }
        });
    }
});

$("#addCart").click(function(){
    var goods_id = $(this).attr('goodsid');
    $.ajax({
        url:'/cart/addToCart',
        data:{goods_id:goods_id},
        type:'post',
        dataType:'json',
        success:function(d){
            console.log(d);
            if(d.ret==-1){
                alert_Display("已存在于购物车");
            }else{
                $("#cartNum").attr("num",parseInt($("#cartNum").attr("num"))+1);
                $("#popone").addClass("show");
                setTimeout(function(){$("#popone").removeClass("show");},1500);
                alert_Display("加入成功");
            }
        }
    });
});

$("#buyBtn").on('click', function() {
    var goods_id=$(this).attr('goodsid');
    $.ajax({
        url:'/pay/addToPay',
        data:{goods_id:goods_id,goods_num:$('#buyNum').val()},
        type:'post',
        dataType:'json',
        success:function(data){
            location = "/pay/"+data.pid;
        }
    });
});

