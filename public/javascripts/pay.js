$(document).ready(function(){
    location.hash = '';
    history.replaceState(null,'',location.pathname+location.search);
    //初始化勾选
    var sameShipId = $('.shipping_content').attr('venderid');
    $('#shippingList ul').each(function(){
        if($(this).attr('shipid') == sameShipId){
            $(this).removeClass('abled').addClass('selected');
        }
    });

    $("#addressDefault").click(function(){
        $.hash().set("title", "addressList").location("?");
    });

    $.hash().listen("title", function(neo, old){
        if(neo.title=="addressList"){
            $("#wxloading").show();
            listSuccess();
        }else if(neo.title=="selectShip"){
            $("#myBody").hide();
            $("#selectShip").show();
        }else if(neo.title=="addressUpdate"){
            $('#myBody').hide();
            $("#wxloading").hide();
            $('#pageEditAddress').show();
        }else if(neo.title=="addressAdd"){
            $("#wxloading").hide();
            $('#myBody').hide();
            $('#pageAddAddress').show();
        }

    });

    function listSuccess(){
        $("#wxloading").hide();
        $("#myBody").hide();
        $("#addressList").show();

        //选择收获地址
        $('#addressList').find('div.address').find('ul').each(function(){
            $(this).removeClass('selected');
            if($(this).attr('adid') == $('#addressId').html()){
                $(this).addClass('selected');
            }
            $(this).on('click',function(event){
                var o = this,
                    t = event.target;

                if ((t.tagName.toLowerCase() === 'li' && t.className.toLowerCase() === 'edit') || $(t).hasClass('btn_edit') || ($(t).parent().hasClass('btn_edit'))) {
                    var index = $("#addressList").find(".edit").index($(t));
                    //editAddress(data.data[index]);
                } else {
                    var addressId = $(o).attr('adid');
                    var addressDetail = '<h3>送至</h3><ul>';
                    addressDetail += '<li>'+$(o).find('li').eq(0).html()+'</li>';
                    addressDetail += '<li>'+$(o).find('li').eq(1).html()+'</li><li id="addressId" style="display:none">'+$(o).attr('adid')+'</li></ul>';
                    $('#addressDefault').html(addressDetail);
                    $('#addressDefault').removeClass('address_null').addClass('address_defalut');
                    $("#addressList").hide();
                    $("#myBody").show();
                    history.back();
                }
            })
        });

        $("#addressList").find(".edit").each(function(){
            var index = $("#addressList").find(".edit").index(this);
            $(this).on('click',function(){
                editAddress(data.data[index]);
            })

        });

        $("#addressList").find("#addAddress").on('click',function(){
            addAddress(true);
        });

    }

    function editAddress(data){
        //console.log(data)
        data.data=data;
        var html = template('tplAddressNeedUpdate', data);
        $("#pageEditAddress").html(html);
        $("#pageEditAddress").attr("adid", data.data.address_id)
        $("#provinceId_m").find("option[value='"+data.data.province+"']").prop("selected",true);
        region.changed(document.getElementById("provinceId_m"), 2, 'cityId_m');
        $("#cityId_m").find("option[value='"+data.data.city+"']").prop("selected",true);
        region.changed(document.getElementById("cityId_m"), 3, 'areaId_m');
        $("#areaId_m").find("option[value='"+data.data.district+"']").prop("selected",true);
        $("#wxloading").show();
        $("#addressList").hide();
        $.hash().set("title", "addressUpdate").location("?");
        //addAddressSubmit(true);
    }

    function addAddress(){
        $("#addressList").hide();
        $("#wxloading").show();
        $.hash().set("title", "addressAdd").location("?");
        $("#pageEditAddress").attr("adid",'');
        addAddressSubmit();
    }


    //支付按钮

    $("#btnAliPay").on('click',function(){
        alert_Display("未开通支付~");
    });


});

//修改商品数量
$('.plus').each(function(){
    $(this).on('click',function(){
        $('#wxloading').show();
        var buyNum = $(this).prev().attr('value');
        buyNum++;
        $(this).prev().attr('value',buyNum);
        var goodsPrice = parseInt($(this).siblings('p').html());
        var cartPrice = parseInt($('#cartPrice').html().substr(1))+goodsPrice;
        var totalPrice = parseInt($('#pageTotalPrice').html().substr(1))+goodsPrice;
        $('#cartPrice').html('¥'+cartPrice);
        $('#pageTotalPrice').html('¥'+totalPrice);
        $('#wxloading').hide();
    });
});

$('.minus').each(function(){
    $(this).on('click',function(){
        var buyNum = $(this).next().attr('value');
        if(buyNum<=1){
            return false;
        }
        else if(buyNum>1){
            $('#wxloading').show();
            buyNum--;
            $(this).next().attr('value',buyNum);
            var goodsPrice = parseInt($(this).siblings('p').html());
            var cartPrice = parseInt($('#cartPrice').html().substr(1))-goodsPrice;
            var totalPrice = parseInt($('#pageTotalPrice').html().substr(1))-goodsPrice;
            $('#cartPrice').html('¥'+cartPrice);
            $('#pageTotalPrice').html('¥'+totalPrice);
            $('#wxloading').hide();
        }
    });
});

//监听url变化

$(window).on('hashchange', function() {
    if(window.location.hash == ''){
        $('#myBody').show();
        $('#selectShip').hide();
        $('#invoices').hide();
        $('#jdQuanPage').hide();
        $("#addressList").hide();
        $('#cxService').hide();
    }else if(window.location.hash == '#?title=addressList'){
        $('#pageAddAddress').hide();
        $('#pageEditAddress').hide();
    }else{
        return false;
    }

});
function runClickEvent(t, o) {
    var adid, type, p;
    if ((t.tagName.toLowerCase() == 'a' && $(t).parent().attr('class') === 'edit') || (t.tagName.toLowerCase() === 'li' && t.className.toLowerCase() === 'edit') || $(t).hasClass('btn_edit') || ($(t).parent().hasClass('btn_edit'))) {
        /* g.loading.show();
         g.userAction.push('addressListEditBtn');
         editAddr($(t).attr('adid'), $(t).attr('type')); */
        var index = $("#addressList").find(".edit").index(o);
        $(this).on('click',function(){
            //console.log(data.data[index]);
            editAddress(data.data[index]);
        })
    } else {
        if($(o).attr('adid') == $('#addressId').html()){
            $(o).addClass('selected');
        }
        $(o).on('click',function(){
            var addressId = $(this).attr('adid');
            changeMoney('/shop/flow/flowAjax.do',{address_id: addressId});
            $("#myBody").show();
            $("#addressList").hide();
            history.back();
        });
    }
}

function addAddressSubmit(){
    $('#wxloading').show();
    $("#submitAddress").on('click',function(){
        if($("#name").val()==""){
            alert_Display("请填写您的名字~");
            return false;
        }
        if($("#mobile").val()==""){
            alert_Display("请填写您的手机号码~");
            return false;
        }
        var telReg = !!$("#mobile").val().match(/^((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)$/);
        //如果通过认证
        if(!telReg){
            alert_Display("请填写正确的手机号码~");
            return false;
        }
        if($("#provinceId_m").find("option:selected").attr("value")==""||$("#provinceId_m").find("option:selected").attr("value")==1){
            alert_Display("请填写省份~");
            return false;
        }
        if($("#cityId_m").find("option:selected").attr("value")==""){
            alert_Display("请填写城市~");
            return false;
        }
        if($("#areaId_m").find("option:selected").attr("value")==""){
            alert_Display("请填写区/县~");
            return false;
        }
        if($("#adinfo").val()==""){
            alert_Display("请填写您的详细地址~");
            return false;
        }
        $("#wxloading").show();
        $.ajax({
            url:'/address/editAddress',
            type:'post',
            data:{
                "address_id":undefined,
                "consignee":$("#name").val(),
                "province":$("#provinceId_m").find("option:selected").text(),
                "city":$("#cityId_m").find("option:selected").text(),
                "district":$("#areaId_m").find("option:selected").text(),
                "province_v":$("#provinceId_m").find("option:selected").val(),
                "city_v":$("#cityId_m").find("option:selected").val(),
                "district_v":$("#areaId_m").find("option:selected").val(),
                "mobile":$("#mobile").val(),
                "address":$("#adinfo").val(),
                'isDefault':$("#defaultId").hasClass('selected')?true:false,
            },
            dataType:'json',
            success:function(data){
                location.reload();
            }
        });

    });

}