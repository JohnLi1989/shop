var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var routes = require('./routes/router');

var app = express();

//启动并连接mongodb
mongoose.connect('mongodb://localhost/shop');
mongoose.connection.on('open',function(){
  console.log('mongodb is open');
});
// 设置视图文件目录和模版引擎 用的ejs模版
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use是用于处理http請求的中间件 
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//设置session
app.use(session({
  secret:'johnli',
  store : new RedisStore({
    port:6379,
    host:'127.0.0.1'
  }),
  resave:true,
  saveUninitialized:true,
  cookie:{maxAge:60*60*1000}
}));
//设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));
//设置全局的变量 user 和 smscode
//user是用户信息 smscode是短信验证码
app.use(function(req,res,next){
  res.locals.user = req.session.user;
  next();
});
app.use(function(req,res,next){
  app.locals.smscode = req.session.smscode;
  next();
});
//设置根路由 路由都在router.js里
app.use('/', routes);


//下面都是一些自动生成的 404页面 500页面
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
