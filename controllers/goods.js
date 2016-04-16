/**
 * Created by john on 16/4/16.
 */
var GoodsModel = require('../models/goods');

exports.detail = function(req,res){
    var gid = req.params.gid;
    GoodsModel.getDetail(gid,function(err,goods){
        res.render('detail',{goods:goods});
    })
}