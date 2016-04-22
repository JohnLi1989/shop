/**
 * Created by john on 16/4/22.
 */
var mongoose = require('mongoose');
var BrandSchema = new mongoose.Schema({
    brand_name : String,
    brand_img : String
});

BrandSchema.statics = {
    getBrand : function(brand_name,cb){
        this.findOne({brand_name:brand_name},cb);
    }
}


var BrandModel = mongoose.model('Brand',BrandSchema);

module.exports = BrandModel;