const mysql = require('mysql');
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'world'
})
connection.connect(function(err){
    if(err)
        return console.log('连接失败!'+err.message);
    console.log('连接成功')
})

connection.query('select * from user',function(err,results){
    //查询失败
    if(err)
        return console.log(err.message)
   //查询成功
    console.log(results)
})
