var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs=require('ejs');
var session=require('express-session');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
 app.use(session({secret:'empty',cookie:{maxAge:1000*60*60*24*30},resave:false,saveUninitialized:false}));

app.use(express.static(path.join(__dirname, 'public')));


app.get('/',(req,res)=>{
	res.send('Hello World - Murari');
	res.end();
})


app.get('/authors',(req,res)=>{
	res.render('count');
})

app.get('/setcookie',(req,res)=>{ 
req.session.auth={name:"Murari",age:"21"};
res.send('Cookies Set')
})


app.get('/image',(req,res)=>{ 
res.sendFile('bs.jpeg');
})


app.get('/robots.txt',(req,res)=>{
	res.send('you should not be here');
	
})

app.get('/getcookies',(req,res)=>{
	res.send("name   "+req.session.auth.name+"    "+"age  "+req.session.auth.age);
})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
