module.exports = {
    server_port:3000,
    db_url:'mongodb://localhost:27017/local',
    db_schemas:[
      {file:'./user_schema',collection:'users3',
      schemaName:'UserSchema',modelName:'UserModel'}
    ],
    route_info:[
        {file:'./user',path:'/process/login',method:'login1',type:'post'},
        {file:'./user',path:'/process/logout',method:'logtout1',type:'post'},
        {file:'./user',path:'/process/adduser/confirm',method:'addUserConfirm1',type:'post'},
        {file:'./user',path:'/listuser',method:'listUser1',type:'post'},
        
        {file:'./atm',path:'/withdraw',method:'withdraw',type:'post'},
        {file:'./atm',path:'/deposit',method:'deposit',type:'post'},
        {file:'./atm',path:'/process/atm',method:'processAtm',type:'get'},
        {file:'./atm',path:'/atm',method:'atm',type:'get'},

        
        {file:'./user',path:'/adduser',method:'adduser',type:'post'},
        {file:'./user',path:'/',method:'main',type:'get'},
        {file:'./user',path:'/login',method:'login',type:'get'},
        {file:'./user',path:'*',method:'error',type:'get'},

    ]
};
