/*
<models의 역할>
1) DB CRUD함수 정의 및 작성
2) 정의한 함수를 각 페이지/상황에 맞게 실행하는 구문 작성
3) 1,2)가 끝나면 controllers는 models에서 만들어 놓은 것을 호출만 하면 OK
*/

const mysql = require("mysql");
const con = require("../databases/db");
const modelsExports = (module.exports = {});

// var sql = "INSERT INTO mypage_test1 (name, email, addr) VALUES ('testName2', 'testEmail2', 'testAddr2');";

// ★Read
modelsExports.readMypage = () => {
  return new Promise((resolve, reject) => {
    let sql = "SELECT * FROM mypage_test1;";
    con.getConnection((err, connection) => {
      try {
        console.log("Connection Success");
        if(err) throw err;

        connection.query(sql, (err, result, fields) => {
          if(err) {
            console.error("SELECT Error");
          } else {
            if(result.length === 0) {
              console.error("DB response NOT Found");
            } else {
              resolve(result);
              console.log("Read Data OK");
            }
          }
        });
        connection.release();
      } catch (err) {
        console.error("pool READ Error");
      }
    });
  });
};

// ★Update
// modelsExports.updateMypage() = () => {
//   return new Promise((resolve, reject) => {
//     let sql = "UPDATE mypage_test1 SET email = 'testEmail' where name = 'testName';"; // where name 성공하면, seq로 변경 후 재시도
//     con.getConnection((err, connection) => {
//       try {
//         console.log("Connection Success");
//         if(err) throw err;

//         connection.query(sql, (err, result, fields) => {
//           if(err) {
//             console.error("UPDATE Error");
//           } else {
//             if(result === 0) {
//               console.error("DB response NOT Found");
//             } else {
//               resolve(result);
//               console.log("Update Data OK");
//             };
//           };
//         });
//         con.release();
//       } catch(err) {
//         console.error("pool UPDATE Error");
//       };
//     });
//   });
// };
