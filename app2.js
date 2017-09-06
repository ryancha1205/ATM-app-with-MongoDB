var http =require('http');
var express =require('express');
var server = http.createServer();
var path =require('path');
var ejs = require('ejs');
const ejsLint = require('ejs-lint');
var static = require('serve-static');


//cookie
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

var config = require('./config');
var database_loader = require('./database/database_loader');
var route_loader = require('./routes/route_loader');
//crpyto 
var crypto =require('crypto');

//mongoose
var mongoose = require('mongoose');
require('mongoose-type-email');

var user = require('./routes/user');
var atm = require('./routes/atm');
var database;
var UserSchema;
var UserModel;


//Connect to database

var app=express();
console.log('config.server_port->'+config.server_port);
app.set('port', config.server_port||3000);
app.use(express.static(__dirname));
app.use(static(path.join(__dirname,'views')));

app.set('views',__dirname+'/views');
app.set('view engine','ejs');


app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());


//app.set('view engine','ejs');
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);

//cookie middele ware
//응답객체에 쿠키 메소드가 있다.
app.use(cookieParser());
app.use(expressSession({
    //설정 정보
    secret:'my key',
    resave:true,
    saveUnitialized:true
}));

route_loader.init(app, express.Router());

var server = http.createServer(app).listen(app.get('port'),function(req,res){
   console.log('run by express:'+3000);

    database_loader.init(app,config);
});
