//const express =require('express');
//const app=express();
//var static = require('serve-static');
//var bodyParser = require('body-parser');
//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());
//
//
//app.set('views',__dirname+'/views');
//app.set('view engine','ejs');
//app.engine('html',require('ejs').renderFile);
//
//app.use(static('router'));
exports.getUser=function(){
    return {id:'test01',name:'소녀시대'};
}
module.exports=function(app){
 
//    app.post('/atm',function(req,res){
//     
//    var uname =req.body.username;
//    var pwd =req.body.password.toString();
//       
//       console.log(uname);
//       console.log(pwd);
//       
//
//       var users = [
//         
//        {'id':'ryan','pass':'1234'},
//        {'id':'python','pass':'1234'},
//        {'id':'json','pass':'1234'},
//        {'id':'alpha','pass':'1234'},
//       ];
//       
//
//    users.map(function(u){
//       for(var i=0; i<users.length;i++){
//        if(users[i].id===uname && users[i].pass.toString()===pwd){
//           res.render('atm.html');  
//            
//        }
//       }
//            res.redirect('/login');    
//
//    });
//       
//});
//       
//
//
//   app.get('/login',function(req,res){        
//        res.render('login.html');
//    });
//
//
//    
//    
//   app.post('/logedin',function(req,res){
//       res.render('logedin.html');
//      
//    });
}