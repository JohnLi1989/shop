/**
 * Created by john on 16/4/17.
 */
exports.requireLogin = function(req,res,next){
    if(req.session.user){
        return next();
    }
    res.redirect('/user/reg');
}