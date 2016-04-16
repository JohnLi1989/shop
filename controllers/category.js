/**
 * Created by john on 16/4/16.
 */
var CategoryModel = require('../models/category');
var eventproxy = require('eventproxy');
exports.category = function(req,res){
    var ep = new eventproxy();
    var cat = req.query.cat;
    ep.all('root_success','seconds_success',function(roots,children){
        res.render('category',{roots:roots,children:children});
    });
    CategoryModel.getRootCategory(function(err,roots){
       ep.emit('root_success',roots)
    });
    CategoryModel.getChildCategory(cat,function(err,children){
        console.log(children);
        _.map(children,function(){
            
        })
        ep.emit('seconds_success',children);
    })

}