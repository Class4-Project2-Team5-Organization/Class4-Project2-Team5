// express + MariaDB 연결해주는 코드 작성하는 파일
// connection부터 connect()까지 (end()는 모르겠음)
// 여긴 아마 "환경설정"이고 정확한 CRUD는 models에서 db 함수 정의
const mysql = require("mysql");
// require("dotenv").config(); // 밑에 dbConfing.json으로 받는걸 쓸거라 주석처리함(게다가 단일커넥션에서 pool방식으로 교체)

var dbConfig = require("./dbconfig");
var con = mysql.createPool(dbConfig);

module.exports = con;