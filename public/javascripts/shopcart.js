/**
 * Created by john on 16/4/17.
 */
var totalPrice = 0 ;
function noGoodsInCart(){
    if($('#list').find('div.section').html() == 0){
        $('#normalEmpty').show();
        $('#mainViewFoot').hide();
        $('#listContent').hide();
        $('#editContent').hide();
    }
}
//全选按钮
$('#checkAllBtn .icon_select').on('click',function(){
    if(!$(this).parent().hasClass('selected')){
        totalPrice = 0;
        $('.icon_select').parent().addClass('selected');
        for(var i=0;i<$('.cart_goods').length;i++){
            var everyPrice = $('.price:eq('+i+') span').html() * $('.num_wrap:eq('+i+') .num').val();
            totalPrice += everyPrice;
            $('#totalPrice').html(totalPrice);
            $('#totalNum').html($('.cart_goods').length);
        }
    }else if($(this).parent().hasClass('selected')){
        $('.icon_select').parent().removeClass('selected');
        totalPrice = 0;
        $('#totalPrice').html(totalPrice);
        $('#totalNum').html(0);
    }
});

//删除选中
$('#deleteBtn').on('click',function(){
    if($('.cart_goods').find('div.selected').length == 0){
        alert_Display("未选择商品");
    }else{
        $('#dialogConent').show();
        $('.mask').show();
    }
});
$('#confirm').on('click',function(){
    var selectedArray = [];
    $('.cart_goods').each(function(){
        if($(this).find('div.goods').hasClass('selected')==true){
            selectedArray.push($(this).attr('goodsid'));
            $(this).remove();
            $('#dialogConent').hide();
            $('.mask').hide();
            totalPrice = 0;
        }
    });
    var goods_ids = selectedArray.join(',');
    $.ajax({
        url:'/cart/delFromCart',
        data:{goods_ids:goods_ids},
        type:'post',
        dataType:'json',
        success:function(){
            noGoodsInCart();
            alert_Display("删除成功！");
            $('#totalPrice').html('0');
            $('#chooseAll').parent().removeClass('selected');
            $('#totalNum').html('0');
            $('#editBtn').trigger('click');
        }
    });
});
$('#cancel').on('click',function(){
    $('#dialogConent').hide();
    $('.mask').hide();
});


//去结算
$('#shopCartConfirm').on('click',function(){
    if($('.cart_goods').find('div.selected').length == 0){
        alert_Display("未选择商品");
    }else{
        var goodsids = [];
        var goodsnum = [];
        $('.cart_goods').each(function(){
            if($(this).find('div.goods').hasClass('selected')==true){
                goodsids.push($(this).attr('goodsid'));
                goodsnum.push($(this).find('.num').attr('value'));
            }
        });
        var ids = goodsids.join(',');
        var num = goodsnum.join(',');
        $.ajax({
            url:'/pay/addToPay',
            data:{goods_id:ids,goods_num:num},
            type:'post',
            dataType:'json',
            success:function(data){
                location = "/pay/"+data.pid;
            }
        });
    }
});

//切换底部
var toEdit = true;
$('#editBtn').on('click',function(){
    if(toEdit == true){
        $('#totalConfirmDiv').hide();
        $('#operateDiv').show();
        $(this).html("结算");
        toEdit = false;
    }else if(toEdit == false){
        $('#totalConfirmDiv').show();
        $('#operateDiv').hide();
        $(this).html("编辑");
        toEdit = true;
    }

});

//选择商品
function goods_select(nowTr){
    var totalNum = $('#totalNum').html();
    if($(nowTr).parent().hasClass('selected')){
        $(nowTr).parent().removeClass('selected');
        totalPrice -= $(nowTr).parent().attr('price') * $(nowTr).siblings('div').find('.num').val();
        $('#totalPrice').html(totalPrice);
        totalNum--;
        $('#totalNum').html(totalNum);
    }else{
        $(nowTr).parent().addClass('selected');
        totalPrice += $(nowTr).parent().attr('price') * $(nowTr).siblings('div').find('.num').val();
        $('#totalPrice').html(totalPrice);
        totalNum++;
        $('#totalNum').html(totalNum);
    }

    var chooseAll = true;
    $('.goods').each(function(){
        if(!$(this).hasClass('selected')){
            chooseAll = false;
        }
    });
    if(chooseAll){
        $('#chooseAll').parent().addClass('selected');
    }else{
        if($('#chooseAll').parent().hasClass('selected')){
            $('#chooseAll').parent().removeClass('selected');
        }
    }

}

function see_goods(nowTr){
    window.location.href=$(nowTr).attr("attr-href");
}

//修改商品数量
var flag = true;
function plus_number(num){
    var thisPrice = $(num);
    var buyNum = $(num).siblings('.num').attr('value');
    buyNum++;
    var goodsId = $(num).parents('.cart_goods').attr('goodsid');
    $.ajax({
        url:'/cart/modifyGoodsNumber',
        type:'post',
        data:{goods_id:goodsId,goods_number:buyNum},
        dataType:'json',
        success:function(data){
            lowStock(data,thisPrice)
        }

    });
    if(flag == true){
        $(num).siblings('.num').attr('value',buyNum);
    }
}
function minus_number(num){
    var thisPrice = $(num);
    var buyNum = $(num).siblings('.num').attr('value');
    if(buyNum == 1){
        return false;
    }else{
        buyNum--;
        $(num).next().attr('value',buyNum);
        var goodsId = $(num).parents('.cart_goods').attr('goodsid');
        $.ajax({
            url:'/cart/modifyGoodsNumber',
            type:'post',
            data:{goods_id:goodsId,goods_number:buyNum},
            dataType:'json',
            success:function(data){
                lowStock(data,thisPrice)
            }

        });

    }
}

//判断库存的回调
function lowStock(data,which){
    console.log(data);
    var newPrice = data.data.goods_price;
    which.parent().siblings('.content').find('p.price').find('span').html(newPrice);
    which.parents('.goods').attr('price',newPrice);
    totalPrice = 0;
    for(var i = 0; i< $('.goods.selected').length;i++){
        var singlePrice = parseInt($('.goods.selected').eq(i).find('p.price').find('span').html()) * parseInt($('.goods.selected').eq(i).find('input').val());
        totalPrice += singlePrice;
    }
    $('#totalPrice').html(totalPrice);
    if(data.msg == 'ERROR'){
        alert_Display("商品库存不足");
        flag = false;
    }else{
        flag = true;
    }
}