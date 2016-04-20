/**
 * Created by john on 16/4/19.
 */
var mongoose = require('mongoose');
var AddressSchema = new mongoose.Schema({
    user_id:String, 
    consignee:String,  //收货人姓名
    mobile:Number, //收货人电话
    province:String,   //省
    city:String,  //市
    district:String, //区县
    province_v:Number,
    city_v:Number,
    district_v:Number,
    address:String, //详细地址
    isDefault:Boolean //是否为默认地址
    
});

AddressSchema.statics = {
    addAddress : function(query,cb){
        this.create(query,cb);
    },
    getAllAddress : function(user_id,cb){
        this.find({user_id:user_id},cb);
    },
    getDefaultAddress : function(user_id,cb){
        this.findOne({user_id:user_id,isDefault:true},cb);
    },
    changeDefaultAddress:function(user_id,cb){
        this.update({user_id:user_id,isDefault:true},{$set:{isDefault:false}},cb);
    },
    getAddress : function(add_id,cb){
        this.findById(add_id,cb);
    },
    updateAddress:function(add_id,query,cb){
        this.findOneAndUpdate({_id:add_id},query,cb);
    }
}

var AddressModel = mongoose.model('Address',AddressSchema);

module.exports = AddressModel;