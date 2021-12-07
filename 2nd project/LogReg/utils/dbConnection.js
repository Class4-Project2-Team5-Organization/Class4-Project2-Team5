const mysql = require('mysql2');

const dbConnection = mysql.createPool({
    host: 'localhost', // 사용할 host로 변경
    user: 'root', // 본인이 사용할 user로 변경
    password: 'wlsrud20', // 본인 mysql 접속 비밀번호으로 변경해서 저장할 것.
    database: 'testmerge' 
});

module.exports = dbConnection.promise();