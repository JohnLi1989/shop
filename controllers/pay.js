/**
 * Created by john on 16/4/21.
 */
var PayModel = require('../models/pay');
var GoodsModel = require('../models/goods');
var AddressModel = require('../models/address');
var USerModel = require('../models/user');
var mongoose = require('mongoose');
var eventproxy = require('eventproxy');
var _ = require('lodash');

exports.addToPay = function(req,res){
    var user_id = req.session.user._id;
    var goods_id = req.body.goods_id;
    var goods_num = req.body.goods_num;
    var goods = [
        {goods_id:goods_id,goods_num:goods_num}
    ];
    var query = {user_id:user_id,goods:goods};
    PayModel.addToPay(query,function(err,result){
       res.json({pid:result._id});
    });
    
}

exports.getPay = function(req,res){
    var pid = req.params.pid;
    var ep = new eventproxy();
    ep.all('goods_success','address_success',function(payGoods,address){
        res.render('pay',{payGoods:payGoods,address:address});
    });
    PayModel.getPay(pid,function(err,pay){
        var goods_ids = [];
        var goods_num = [];
        for(var k in pay.goods){
            goods_ids.push(pay.goods[k].goods_id);
            goods_num.push({goods_num:pay.goods[k].goods_num});
        }
        goods_ids = goods_ids.map(function(item,index){
            return new mongoose.Types.ObjectId(item);
        });
        GoodsModel.getByGoodsId(goods_ids,function(err,goods){
            if(goods){
                var payGoods = _.zip(goods,goods_num);
                ep.emit('goods_success',payGoods);
            }
        });
        AddressModel.getDefaultAddress(pay.user_id,function(err,address){
           if(address){
               ep.emit('address_success',address);
           }else{
               ep.emit('address_success',null);
           }
        });
    });
}