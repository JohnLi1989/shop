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
    var goods_id = req.body.goods_id.split(',');
    var goods_num = req.body.goods_num.split(',');
    var zipgoods = _.zip(goods_id,goods_num);
    var goods = [];
    for(var i=0;i<zipgoods.length;i++){
        goods.push({goods_id:zipgoods[i][0],goods_num:zipgoods[i][1]});
    }
    var query = {user_id:user_id,goods:goods};
    PayModel.addToPay(query,function(err,result){
       res.json({pid:result._id});
    });
    
}

exports.getPay = function(req,res){
    var pid = req.params.pid;
    var ep = new eventproxy();
    ep.all('goods_success','address_success','addlist_success',function(payGoods,address,addList){
        res.render('pay',{payGoods:payGoods,address:address,addList:addList});
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
    var user_id = req.session.user._id;
    AddressModel.getAllAddress(user_id,function(err,addList){
       if(addList){
            ep.emit('addlist_success',addList);
        }
    });
}