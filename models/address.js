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
    getDefaultAddress : function(user_id){
        this.findOne({user_id:user_id,isDefault:true},cb);
    }
}

var AddressModel = mongoose.model('Address',AddressSchema);

module.exports = AddressModel;