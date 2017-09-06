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

//crpyto 
var crypto =require('crypto');

//mongoose
var mongoose = require('mongoose');
require('mongoose-type-email');

var user = require('./routes/user');
var database;
var UserSchema;
var UserModel;


//Connect to database




var app=express();
app.use(express.static(__dirname));
app.use(static(path.join(__dirname,'views')));
//app.use(static(path.join(__dirname,'public_css')));
//app.use(static(path.join(__dirname,'js')));




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


function connectDB(){
var databaseUrl = 'mongodb://localhost:27017/local';

   mongoose.Promise = global.Promise;
   mongoose.connect(databaseUrl);
   database = mongoose.connection;

 database.on('open',function(){
    console.log('데이터베이스에 연결됨.'+databaseUrl);
    
   createUserSchema(database);
   
       
 });
  database.on('disconnected',function(){
    console.log('데이터베이스 연결 끊어짐.'); 
    });
    
    database.on('error',console.error.bind(console,'mongoose 연결 에러.'));
    app.set('database',database);
}

function createUserSchema(database){
    database.UserSchema = require('./database/user_schema').createSchema(mongoose);
    
    database.UserModel = mongoose.model('users3',database.UserSchema);
    console.log('UserSchema 정의함.');
}


var router =express.Router();



router.route('/process/atm').get(function(req,res){
    console.log('/process/atm 라우팅 함수 호출됨.');
    cookie = req.cookies.logged;
    money = req.cookies.money;
    if (cookie === undefined) {
		console.log('Not logged in... Redirecting');
		res.redirect('/login')
	}else {
        //쿠키에 저정된 머니를 뿌린다.
        
		console.log('Logged in as:'+cookie);
		console.log('Money: ' + money);

		res.redirect('/atm');
  		console.log('Displaying Member Page');
	}
});

router.route('/process/login').post(user.login1);
router.route('/process/logout').post(user.logtout1);
router.route('/process/adduser/confirm').post(user.addUserConfirm1);
router.route('/listuser').post(user.listUser1);

router.route('/adduser').post(function(req,res){
   res.render('adduser.html'); 
});

   


//1.첫 페이지
    router.route('/').get(function(req,res){
       res.render('index.html'); 

});

//3.로그인 페이지
   router.route('/login').get(function(req,res){
        res.render('login.html');

   });

    router.route('/atm').get(function(req,res){
        res.render('atm.html');
    });
   
 // Routing for Withdraw
app.post('/withdraw', function (req, res) {
  var amount = parseInt(req.body.amount);
  var cur_money = parseInt(req.cookies.money);
  var new_money = cur_money - amount;
  var paramId =  req.cookies.logged;
    database.UserModel.where({"id":paramId}).update({"money":new_money},function(err){
     if(err){
      callback(err,null);
         console.log('can not update');
        return;
  }                        
  });
  //인출후 상태를 쿠키에 저장시켜준다.
  res.cookie('money',new_money);
  res.redirect('/process/atm');
});

// Routing for Deposit
app.post('/deposit', function (req, res) {
  var amount2 = parseInt(req.body.amount2);
  var cur_money = parseInt(req.cookies.money);
  var new_money = cur_money + amount2;
  var paramId =  req.cookies.logged;
  res.cookie('money',new_money);
 database.UserModel.where({"id":paramId}).update({"money":new_money},function(err){
     if(err){
      callback(err,null);
         console.log('can not update');
        return;
  }                        
  });
  res.cookie('money',new_money);
  res.redirect('/atm');
    
 
});

app.use('/',router);



/////////////////////////////////////METHO/////////////////////


///////////////////////사용자 추가 ///////////////////////////////////

////////////////////update information//////////////////////

///////////////////////////////////////////////////////////////////

app.use('*',function(req,res){
    res.status(404).send('<h1>요청하신 페이지는 없어요.</h1>');
});


var server = http.createServer(app).listen(3000,function(req,res){
   console.log('run by express:'+3000);
   connectDB();
    
});

//app.use(static('public'));
//app.use(express.static('public'));

//app.use(express.static('views'));
//app.use(static('views'));

