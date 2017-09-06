var withdraw =function (req, res) {
    
  var database = req.app.get('database');
  var amount = parseInt(req.body.amount);
  var cur_money = parseInt(req.cookies.money);
  var new_money = cur_money - amount;
  var paramId =  req.cookies.logged;
    database.UserModel.where({"id":paramId}).update({"money":new_money},function(err){
    
    if(err){
//          callback(err,null);
         console.log('can not update');
//         callback(err,null);
       res.redirect('/atm');
  }                        
});
  
    
  res.cookie('money',new_money);
  res.redirect('/process/atm');
};
var deposit =function (req, res) {
    var database = req.app.get('database');
  var amount2 = parseInt(req.body.amount2);
  var cur_money = parseInt(req.cookies.money);
  var new_money = cur_money + amount2;
  var paramId =  req.cookies.logged;
  res.cookie('money',new_money);
 database.UserModel.where({"id":paramId}).update({"money":new_money},function(err){
     if(err){
//      callback(err,null);
         console.log('can not update');
       res.redirect('/atm');
  }                        
  });
  res.cookie('money',new_money);
  res.redirect('/atm');
    
 
};
var processAtm =function(req,res){
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
};
var atm = function(req,res){
        res.render('atm.html');
    };
module.exports.withdraw = withdraw; 
module.exports.deposit = deposit;
module.exports.processAtm =processAtm;
module.exports.atm =atm;
