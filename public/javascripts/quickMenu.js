/**
 * Created by john on 16/4/17.
 */
$(function(){
    var css = document.createElement('link');
    css.href="/stylesheets/quickmenu.css";
    css.rel="stylesheet";
    css.type="text/css";
    document.getElementsByTagName('head')[0].appendChild(css);

    var quck = '<div class="wx_aside" id="quckArea">';
    quck += '<a href="javascript:void(0);" id="quckIco2" class="btn_more">更多</a>';
    quck += '<a href="javascript:;" id="goTop" style="display:none;" class="goTopBtn btn_top btn_top_active">返回顶部</a>';
    quck += '<div class="wx_aside_item" id="quckMenu" >';
    quck += '<a href="/shop/goods/promotion.do" class="item_jd" target="_top">精选促销</a>';
    quck += '<a href="/shop/users/me.do" id="persLink" class="item_uc" target="_top">个人中心</a>';
    quck += '<a href="/shop/goods/promotion.do" class="item_index" id="quick_shoplink" style="display:none">首页</a>';
    quck += '<a href="/shop/collectGoods/collectGoodsList.do" class="item_fav" target="_top">我的收藏</a>';
    quck += '<a href="/shop/users/history.do" class="item_history" target="_top">最近浏览</a>';
    quck += '</div></div>';

    $('body').append(quck);

    $('#quckIco2').on('click',function(){
        $('#quckMenu').toggle();
        $('#quckArea').toggleClass("more_active");
    });

});

