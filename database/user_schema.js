var crypto = require('crypto');

var Schema ={};

Schema.createSchema = function(mongoose){
  console.log('createSchema 호출됨.');

 var UserSchema = mongoose.Schema({
    email:{work: mongoose.SchemaTypes.Email,home: mongoose.SchemaTypes.Email},
    id:{type:String, required:true, unique:true,'defualt':''},
    hashed_password:{type:String, required:true,'default':''},
    salt:{type:String, required:true},
    name:{type:String, index:'hashed'},
    age:{type:Number},
    money:{type:Number,'defualt':0},
    created_at:{type:Date,index:{unique:false},'default':Date.now()},
    updated_at:{type:Date,index:{unique:false},'default':Date.now()}
    });
    console.log('UserSchema 정의함.');
     
    UserSchema
        .virtual('password')
        .set(function(password){
          this.salt=this.makeSalt();
          this.hashed_password = this.encryptPassword(password);
          console.log('virtual password　저장됨'+this.hashed_password);
          console.log(this.salt);
        });
     
     
     
     UserSchema.method('makeSalt',function(){
         return Math.round((new Date().valueOf()*Math.random()))+'';
     });
     
     UserSchema.method('encryptPassword',function(plainText,inSalt){
        if(inSalt){
            return crypto.createHmac('sha1',inSalt).update(plainText).digest('hex');
            
        }else{
            return crypto.createHmac('sha1',this.salt).update(plainText).digest('hex');
        }
     });
     
     UserSchema.method('authenticate',function(plainText,inSalt,hashed_password){
        if(inSalt){
            console.log('authentiCate 호출됨.');
            return this.encryptPassword(plainText,inSalt)===hashed_password;
        }else{
            console.log('authentiCate 호출됨.');
            return this.encryptPassword(plainText)===hashed_password;
        }
     });
     
    UserSchema.static('findById',function(id, callback){
        return this.find({id:id},callback);
    });   
     
  //find all
        UserSchema.static('findAll',function(callback){
            return this.find({},callback);
        });
    
    return UserSchema;
    
    }

module.exports = Schema;
