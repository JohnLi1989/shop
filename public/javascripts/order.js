/**
 * Created by john on 16/4/21.
 */
var	width = $(window).width();
$('#nav li').each(function(){
    var no = $(this).attr('no');
    $(this).on('click',function(){
        $(this).addClass('cur');
        $(this).siblings().removeClass('cur');
        $('#cont').css({'transform':'translate('+(-(width*no))+'px,0px)','height':'auto'});
    });
});


//跳转到对应的tab
var from = localStorage.getItem("from");
if(from == 'topay'){
    $("[no='1']").trigger("click");
    localStorage.setItem("from","");
}else if(from == 'torec'){
    $("[no='2']").trigger("click");
    localStorage.setItem("from","");
}else if(from == 'toeva'){
    $("[no='3']").trigger("click");
    localStorage.setItem("from","");
}