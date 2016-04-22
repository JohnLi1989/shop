/**
 * Created by john on 16/4/19.
 */
    var isDefault = false;
    $('#new').click(function(){
        $("#wxloading").show();
        $.hash().set("myAddress", "edit").remove("address_id").location("?");
    });
    $('.edit').click(function(){
        $.hash().set({
            myAddress: 'edit',
            address_id: $(this).attr("adid")
        }).location("?");
    });
    $.hash().listen("myAddress","address_id", function(neo, old){
        if(neo.myAddress=="edit"&&neo.address_id){
            $("#wxloading").show();
            $.ajax({
                url:'/address/getAddress',
                type:'post',
                data:{
                    address_id:neo.address_id
                },
                dataType:'json',
                success:function(data){
                    getSuccess(data);
                }
            });
        }else if(neo.myAddress=="edit"&&neo.address_id==undefined){
            emptyData();
            $("#wxloading").hide();
            $("#myAddress_edit").show();
            $("#myAddress_list").hide();
        }else{
            $("#wxloading").show();
            $('.edit').click(function(){
                $("#wxloading").show();
                $.hash().set({
                    myAddress: 'edit',
                    address_id: $(this).attr("adid")
                }).location("?");
            });
            $("#wxloading").hide();
            $("#myAddress_edit").hide();
            $("#myAddress_list").show();
        }
    });
    if($.hash().get("myAddress")=='edit'&&$.hash().get("address_id")==undefined){
        emptyData();
        $("#wxloading").hide();
        $("#myAddress_edit").show();
        $("#myAddress_list").hide();
    }else if($.hash().get("myAddress")=='edit'&&$.hash().get("address_id")>0){
        $("#wxloading").show();
        $.ajax({
            url:'/address/editAddress',
            type:'post',
            data:{
                address_id:$.hash().get("address_id")
            },
            dataType:'json',
            success:function(data){
                getSuccess(data);
            }
        });
    }

    function getSuccess(data){
        console.log(data);
        data=data.data;
        $("#name").val(data.consignee);
        $("#mobile").val(data.mobile);
        $("#adinfo").val(data.address);
        if(data.isDefault){
            $("#defaultId").removeClass('selected').addClass('selected');
        }else{
            $("#defaultId").removeClass('selected');
        }
        isDefault = data.is_default;
        var province=data.province;
        var city=data.city;
        var district=data.district;
        $("#provinceId_m").find("option[value='"+province+"']").prop("selected",true);
        region.changed(document.getElementById("provinceId_m"), 2, 'cityId_m');
        $("#cityId_m").find("option[value='"+city+"']").prop("selected",true);
        region.changed(document.getElementById("cityId_m"), 3, 'areaId_m');
        $("#areaId_m").find("option[value='"+district+"']").prop("selected",true);
        $("#wxloading").hide();
        $("#myAddress_edit").show();
        $("#myAddress_list").hide();
    }

    function emptyData(){
        $("#name").val("");
        $("#mobile").val("");
        $("#adinfo").val("");
        $("#provinceId_m").find("option[value='1']").prop("selected",true);
        $("#cityId_m").empty();
        $("#cityId_m").prepend('<option value="">--选择城市--</option>');
        $("#areaId_m").empty();
        $("#areaId_m").prepend('<option value="">--选择县/区--</option>');
        $("#defaultId").removeClass('selected');
    }

    $('#defaultId').on('click',function(){
        $(this).toggleClass('selected');
    });

    $("#editBtn").on('click',function(){
        if($("#name").val()==""){
            alert_Display("请填写您的名字~");
            return false;
        }
        if($("#mobile").val()==""){
            alert_Display("请填写您的手机号码~");
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
                "address_id":$.hash().get("address_id"),
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
                console.log(data);
                window.location.hash='';
                location.reload();
            }
        });

    });

