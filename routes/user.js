
var login1 = (req,res)=>{
    console.log('/process/login 라우팅 함수 호출됨.');
    var paramId =req.body.id;
    var paramPassword =req.body.password;
  
   console.log('요청 파라미터 :'+paramId+','+paramPassword);
    var database = req.app.get('database');
     if(database){
    authUser(database,paramId,paramPassword,function(err,docs){
       if(err){
           console.log('Error');
           res.writeHead(200,{"Content-Type":"text/html;charset=utf8"});
               res.write('<h1>Error</h1>');
               res.end();
       }
        if(docs){
            res.cookie('logged', docs[0].id);
            res.cookie('money', docs[0].money);
            
            cookie = req.cookies.logged;
            res.redirect('/process/atm');
        }else{
            res.redirect('/login');
        }

    });
    }else{
       console.log('에러 발생');
       res.writeHead(200,{"Content-Type":"text/html;charset=utf8"});
       res.write('<h1>Can not connect to the database</h1>');
       res.end();
    }
   
};
var addUserConfirm1 =(req,res)=>{
    console.log('/process/adduser/confirm 라우트 함수 호출됨.');
    var database = req.app.get('database');

    var database = req.app.get('database');

    var paramEmail = req.body.email||req.query.email;
    var paramId = req.body.id||req.query.id;
    var paramPassword = req.body.password||req.query.password;
    var paramPassword2 = req.body.password2||req.querypassword2;
    var paramName =req.body.name||req.query.name;
    var paramAge = req.body.age||req.query.age;
    var paramMoney = req.body.money||req.query.money;
    if(paramPassword!=paramPassword2){
        console.log('Error');
        res.writeHead(200,{"Content-Type":"text/html;charset=utf8"});
       res.write('<h1>Confirm your password</h1>');
        res.write('<h1><a href="/adduser.html">회원가입으로 다시 가기</a></h1>');

       res.end();    
        return;
          }
    
        console.log('요청 파라미터:'+paramId+','+paramPassword+','+paramName+','+paramAge+','+paramEmail);
        if(database){
//   var user = new UserModel({"email":email,"id":id,"password":password,"name":name,"age":age,"money":0});

        addUser(database,paramEmail,paramId,paramPassword,paramName,paramAge,function(err,result){
              if(err){
               console.log('Error');
                res.writeHead(200,{"Content-Type":"text/html;charset=utf8"});
               res.write('<h1>Error</h1>');
               res.end();                  
           }
            if(result){
            console.log(result);
            res.cookie('logged', result[0].id);
            res.cookie('money', result[0].money);
                
            res.writeHead(200,{"Content-Type":"text/html;charset=utf8"});
                
                var context={
                id:paramId,
                name:paramName
            };
                req.app.render('register_success',context,function(err,html){
                if(err){
                    console.log('뷰 렌더링 중 에러 발생:'+err.stack);
                    res.writeHead(200,{"Content-Type":"text/html;charset=utf8"});
                   res.write('<h1>Nothing is added</h1>');
                   res.end();
                    return;
                }
                    res.end(html);
            });
                
            }else{
                console.log('Error');
               res.writeHead(200,{"Content-Type":"text/html;charset=utf8"});
               res.write('<h1>Nothing is added</h1>');
               res.end();
            }
        });
    
    }else{
        console.log('에러 발생');
       res.writeHead(200,{"Content-Type":"text/html;charset=utf8"});
       res.write('<h1>Can not connect to the database</h1>');
       res.end();
    }    
    };
var listUser1 = (req,res)=>{
    console.log('/listuser 라우트 함수 호출됨.');
    var database = req.app.get('database');
    database.UserModel.findAll(function(err,docs){
       if(err){
           console.log('Error');
           res.writeHead(200,{"Content-Type":"text/html;charset=utf8"});
           res.write('<h1>Nothing is added</h1>');
           res.end();
           return;
       } 
        if(docs){
//             
           var context= [
               result=docs
           ];
            
            console.log(result);
            console.log(result[0]._doc.id);

            req.app.render('user_list', result, function(err, html){
               if(err){
                    console.log('뷰 렌더링 중 에러 발생:'+err.stack);
                   res.writeHead(200,{"Content-Type":"text/html;charset=utf8"});
                   res.write('<h1>Nothing is added</h1>');
                   res.end();
                    return;
               }
                res.writeHead(200,{"Content-Type":"text/html;charset=utf8"});
                res.end(html);
                });
        }else{
               console.log('Error');
               res.writeHead(200,{"Content-Type":"text/html;charset=utf8"});
               res.write('<h1>Nothing is added</h1>');
               res.end();
            }
        
        
    });
};
var logout1 = (req,res)=>{
     console.log('/proess/logout 라우트 함수 호출됨.');
     
        res.clearCookie("logged");
        res.clearCookie("money");
        res.redirect('/login'); 
  };

var addUser=(db, email, id, password, name, age, callback)=>{
     console.log('addUser 호출됨.:'+id+','+password+','+name);
    var user = new db.UserModel({"email":email,"id":id,"password":password,"name":name,"age":age,"money":0});
    
    user.save(function(err){
        if(err){
            callback(err,null);
            return;
        }
        console.log('사용자 데이터 추가함.');
        callback(null,user);
    });  
};
var authUser = (db, id, password,callback)=>{
    console.log('authUser 호출됨.'+id+','+password);

    db.UserModel.findById(id,function(err,results){
       if(err){
           callback(err,null);
           return;
       } 
        console.log('아이디를 %로 검색함.');
        if(results.length>0){
          var User = new db.UserModel({id:id});
           var authenticated = User.authenticate(password,results[0]._doc.salt,results[0]._doc.hashed_password);
            console.log(results[0]._doc.hashed_password);
            console.log(results[0]._doc.salt);
            
            if(authenticated){
                console.log('비밀번호 일치함.');
                callback(null, results);
            }else{
                console.log('비밀번호 일치하지 않음.');
                callback(null,null);
            }
            
        }else{
            console.log('아이디 일치하는 사용자 없음.');
            callback(null,null);
        }
    });
    
};
var adduser = (req,res)=>{
   res.render('adduser.html'); 
};
var main =function(req,res){
       res.render('index.html'); 

};
var login = function(req,res){
        res.render('login.html');

   };
var error = function(req,res){
    res.status(404).send('<h1>요청하신 페이지는 없어요.</h1>');
};
module.exports.addUserConfirm1 =addUserConfirm1;
module.exports.listUser1 = listUser1;
module.exports.logtout1 = logout1;
module.exports.login1 = login1;


module.exports.adduser = adduser;
module.exports.main = main;
module.exports.login = login;
module.exports.error =error;