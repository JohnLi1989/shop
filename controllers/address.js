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

exports.addAddress = function(req,res){
    var user_id = req.session.user._id;
    var consignee = req.body.consignee;
    var mobile = req.body.mobile;
    var province = req.body.province;
    var city = req.body.city;
    var district = req.body.district;
    var addressInfo = req.body.address;
    var isDefault = req.body.isDefault;
    var query = {
        user_id:user_id,
        consignee:consignee,
        mobile:mobile,
        province:province,
        city:city,
        district:district,
        address:addressInfo,
        isDefault:isDefault
    }
    address.addAddress(query,function(err,result){
        if(result){
            res.json({msg:"SECCESS"});
        }
    });
}