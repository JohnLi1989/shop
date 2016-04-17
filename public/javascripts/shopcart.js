/**
 * Created by john on 16/4/17.
 */
var totalPrice = 0 ;
var user_id="${sessionScope.SESSION_USERS.user_id}";
$("#wxloading").show();
postapi("/shop/cart/getShopFromCart.do",{},getCartSuccess, {'user_id':user_id});
function noGoodsInCart(){
    if($('#list').find('div.section').html() == ''){
        $('#normalEmpty').show();
        $('#mainViewFoot').hide();
        $('#listContent').hide();
        $('#editContent').hide();

    }
}
function getCartSuccess(data){
    $("#wxloading").hide();
    if(data.ret == -1){
        noGoodsInCart();
    }
    data=data.data;
    var result = [];
    $(".session").find(".cart_goods").remove();
    for(var key in data){
        result.push('<div class="item cart_goods" recid="'+data[key].rec_id+'" goodsid="'+data[key].goods.goods_id+'"><div class="goods_wrap">');
        result.push('<div class="goods" price="'+data[key].goods_price+'"><i onclick="goods_select(this);" class="icon_select"></i>');
        result.push('<a href="/shop/goods/goodsDetail.do?goods_id='+data[key].goods.goods_id+'" class="link">');
        result.push('<img class="image" src="'+data[key].goods.goods_thumb+'" width="80" height="80" />');
        result.push('</a><div class="content" attr-href="/shop/goods/goodsDetail.do?goods_id='+data[key].goods.goods_id+'" onclick="see_goods(this);"><p class="name">'+data[key].goods.goods_name+'</p>');
        result.push('<p class="attr">'+data[key].goods_attr+'</p><p class="price">¥<span>'+data[key].goods_price+'</span></p>');
        result.push('<div class="action"> <a href="javascript:void(0);" class="action_fav"><span>移至收藏</span></a><a href="javascript:void(0);" class="action_delete"><span>删除</span></a>');
        result.push('</div> <a href="#" class="btn" style="display:none">到货通知我</a>');
        result.push('<p class="tips"></p></div>');
        result.push('<div class="num_wrap"><span class="minus" onclick="minus_number(this);"></span>');
        result.push('<input class="num" type="tel" value="'+data[key].goods_number+'"><p class="attr" style="display:none">'+data[key].goods_attr+'</p>');
        result.push('<span class="plus" onclick="plus_number(this);"></span></div></div></div></div>');
    }
    $(".section").append(result.join(''));
    $("#wxloading").hide();
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
                selectedArray.push($(this).attr('recid'));
                $(this).remove();
                $('#dialogConent').hide();
                $('.mask').hide();
                totalPrice = 0;
            }
        });
        var cartIds = selectedArray.join(',');
        postapi("/shop/cart/deleteCart.do",{cart_ids:cartIds},delSuccess,{'user_id':user_id});
    });
    $('#cancel').on('click',function(){
        $('#dialogConent').hide();
        $('.mask').hide();
    });
    function delSuccess(data){
        noGoodsInCart();
        alert_Display("删除成功！");
        $('#totalPrice').html('0');
        $('#chooseAll').parent().removeClass('selected');
        $('#totalNum').html('0');
        $('#editBtn').trigger('click');
    }
    //移至收藏夹
    $('#addFavor').on('click',function(){
        if($('.cart_goods').find('div.selected').length == 0){
            alert_Display("未选择商品");
        }else{
            $('#dialogConent2').show();
            $('.mask').show();
        }
    });
    $('#confirm2').on('click',function(){
        var selectedFav = [];
        var selectedFavCart = [];
        $('.cart_goods').each(function(){
            if($(this).find('div.goods').hasClass('selected')==true){
                selectedFav.push($(this).attr('goodsid'));
                selectedFavCart.push($(this).attr('recid'));
                $(this).remove();
                $('#dialogConent2').hide();
                $('.mask').hide();
                totalPrice = 0;
            }
        });
        var goodsIds = selectedFav.join(',');
        var cartIds = selectedFavCart.join(',');
        postapi("/shop/collectGoods/addCollectGoods.do",{goods_ids:goodsIds,cart_ids:cartIds},favSuccess,{'user_id':user_id});
    });
    $('#cancel2').on('click',function(){
        $('#dialogConent2').hide();
        $('.mask').hide();
    });
    function favSuccess(){
        alert_Display("收藏成功！");
        noGoodsInCart();
        $('#totalPrice').html('0');
        $('#chooseAll').parent().removeClass('selected');
        $('#totalNum').html('0');
        $('#editBtn').trigger('click');
    }
    //去结算
    $('#shopCartConfirm').on('click',function(){
        if($('.cart_goods').find('div.selected').length == 0){
            alert_Display("未选择商品");
        }else{
            var toPayArray = [];
            $('.cart_goods').each(function(){
                if($(this).find('div.goods').hasClass('selected')==true){
                    toPayArray.push($(this).attr('recid'));
                }
            });
            var toPayIds = toPayArray.join(',');
            postapi("/shop/cart/cartToPay.do",{cart_ids:toPayIds},toPaySuccess,{'user_id':user_id});
        }
    });
    function toPaySuccess(data){
        if(data.ret==1){
            location="/shop/flow/flow.do";
        }else if(data.ret==-1){
            alert_Display(data.data);
        }else if(data.ret==-2){
            alert_Display("限时购买限每日13点30起半小时内");
        }

    }
}


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
    var goodsAttr = $(num).siblings('p').html();
    var cartId = $(num).parents('.cart_goods').attr('recid');
    postapi("/shop/cart/modifyGoodsNumber.do",{goods_id:goodsId,goods_attr:goodsAttr,goods_number:buyNum,cart_id:cartId},lowStock,{'user_id':user_id,'price':thisPrice});
    if(flag == true){
        $(num).siblings('.num').attr('value',buyNum);
    }
    /* if($(num).parents('.goods').hasClass('selected')){
     var plusPrice = parseInt($(num).parents('.goods').attr('price'));
     var newPrice = parseInt($(num).parent().siblings('.content').find('p.price').find('span').html());
     $('#totalPrice').html(totalPrice);
     } */
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
        var goodsAttr = $(num).siblings('p').html();
        var cartId = $(num).parents('.cart_goods').attr('recid');
        postapi("/shop/cart/modifyGoodsNumber.do",{goods_id:goodsId,goods_attr:goodsAttr,goods_number:buyNum,cart_id:cartId},lowStock,{'user_id':user_id,'price':thisPrice});
        /* if($(num).parents('.goods').hasClass('selected')){
         var minusPrice = $(num).parents('.goods').attr('price');
         totalPrice -= minusPrice;
         $('#totalPrice').html(totalPrice);
         } */
    }
}

//判断库存的回调
function lowStock(data,which){
    var newPrice = data.data.goods_price;
    which.price.parent().siblings('.content').find('p.price').find('span').html(newPrice);
    which.price.parents('.goods').attr('price',newPrice);
    totalPrice = 0;
    for(var i = 0; i< $('.goods.selected').length;i++){
        var singlePrice = parseInt($('.goods.selected').eq(i).find('p.price').find('span').html()) * parseInt($('.goods.selected').eq(i).find('input').val());
        totalPrice += singlePrice;
    }
    $('#totalPrice').html(totalPrice);
    if(data.msg == 'ERROR'){
        alert_Display("商品库存不足");
        flag = false;
    }
}