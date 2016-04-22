/**
 * Created by john on 16/4/19.
 */
var address = require('../models/address');

exports.addressList = function(req,res){
    var user_id = req.session.user._id;
    address.getAllAddress(user_id,function(err,address){
       if(address.length==0){
           return res.render('address',{address:''});
       }
        res.render('address',{address:address});
    });
}

exports.editAddress = function(req,res){
    var user_id = req.session.user._id;
    var consignee = req.body.consignee;
    var mobile = req.body.mobile;
    var province = req.body.province;
    var city = req.body.city;
    var district = req.body.district;
    var province_v = req.body.province_v;
    var city_v = req.body.city_v;
    var district_v = req.body.district_v;
    var addressInfo = req.body.address;
    var isDefault = req.body.isDefault;
    var address_id = req.body.address_id;
    var query = {
        user_id:user_id,
        consignee:consignee,
        mobile:mobile,
        province:province,
        city:city,
        district:district,
        province_v:province_v,
        city_v:city_v,
        district_v:district_v,
        address:addressInfo,
        isDefault:isDefault
    }
    console.log(address_id);
    if(address_id!=undefined){
        if(isDefault=="true"){
            address.changeDefaultAddress(user_id,function(err){
                if(err){
                    return console.error(err);
                }
                address.updateAddress(address_id,query,function(err,result){
                    if(result){
                        res.json({msg:"SUCCESS"});
                    }
                });
            });
        }else{
            address.updateAddress(address_id,query,function(err,result){
                if(err){throw err}
                console.log(result);
                if(result){
                    res.json({msg:"SUCCESS"});
                }
            });
        }
    }else{
        console.log(22223333);
        if(isDefault=="true"){
            address.changeDefaultAddress(user_id,function(err){
                if(err){
                    return console.error(err);
                }
                address.addAddress(query,function(err,result){
                    if(result){
                        res.json({msg:"SUCCESS"});
                    }
                });
            });
        }else{
            address.addAddress(query,function(err,result){
                if(result){
                    res.json({msg:"SUCCESS"});
                }
            });
        }
    }

}

exports.getAddress = function(req,res){
    var add_id = req.body.address_id;
    address.getAddress(add_id,function(err,add){
       res.json({data:{
           consignee:add.consignee,
           mobile:add.mobile,
           province:add.province_v,
           city:add.city_v,
           district:add.district_v,
           address:add.address,
           isDefault:add.isDefault
       }});
    });
}