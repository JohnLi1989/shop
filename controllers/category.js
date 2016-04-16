/**
 * Created by john on 16/4/16.
 */
var CategoryModel = require('../models/category');
var eventproxy = require('eventproxy');
exports.category = function(req,res){
    var ep = new eventproxy();
    var cat = req.query.cat;
    ep.all('root_success','child_success',function(roots,ret){
        res.render('category',{roots:roots,children:ret});
    });
    CategoryModel.getRootCategory(function(err,roots){
       ep.emit('root_success',roots)
    });
    CategoryModel.getChildCategory(cat,function(err,children){
        var ret = getDate(children);
        ep.emit('child_success',ret);
    });
}

exports.ajaxCategory = function(req,res){
    var ep = new eventproxy();
    var cat = req.query.cat;
    ep.all('ajax_success',function(ret){
        res.json(ret);
    });
    CategoryModel.getChildCategory(cat,function(err,children){
        var ret = getDate(children)
        ep.emit('ajax_success',ret);
    });
}

function getDate(data){
    var ret = [];
    if (data) {
        var map = {}, keys = [], tmp, second;
        for (var i = 0; i < data.length; i++) {
            tmp = data[i];
            second = tmp.second;
            if (second) {
                if (!map[second]) {
                    keys.push(second);
                    map[second] = [];
                }else{
                    map[second].push({
                        cat_name: tmp.third,
                        cat_img: tmp.cat_img
                    });
                }
            }
        }
        for (var j = 0; j < keys.length; j++) {
            ret.push({
                cat_name: keys[j],
                child_cat: map[keys[j]]
            });
        }
    }
    return ret;
};