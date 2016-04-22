/**
 * Created by john on 16/4/21.
 */
var mongoose = require('mongoose');
var PaySchema = new mongoose.Schema({
    user_id:String,
    goods:[]
});

PaySchema.statics = {
    addToPay:function(query,cb){
        this.create(query,cb);
    },
    getPay : function(pid,cb){
        this.findById(pid,cb);
    }
}

var PayModel = mongoose.model('Pay',PaySchema);

module.exports = PayModel;