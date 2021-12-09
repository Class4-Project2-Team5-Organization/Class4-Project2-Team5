/*
<models의 역할>
1) DB CRUD함수 정의 및 작성
2) 정의한 함수를 각 페이지/상황에 맞게 실행하는 구문 작성
3) 1,2)가 끝나면 controllers는 models에서 만들어 놓은 것을 호출만 하면 OK
*/

const mysql = require("mysql");
const con = require("../utils/dbConnection.js");
const modelsExports = (module.exports = {});
const controller = require("../controllers/controllers.js"); // Update 때문에 어쩔 수 없이 controller 빌리긴 했는데, 맞나 싶다

// ★Read
modelsExports.readMypage = () => {
  return new Promise((resolve, reject) => {
    let sql = "SELECT * FROM users;";
    con.getConnection((err, connection) => {
      try {
        if(err) throw err;
        console.log("Connection Success");

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
modelsExports.updateMypage = () => {
  return new Promise((resolve, reject) => {
    con.getConnection((err, connection) => {
      try {
        if(err) throw err;
        console.log("Connection Success");
        
        let options1 = controller.modifyInfo.name;
        let options2 = controller.modifyInfo.email;
        let options3 = controller.modifyInfo.password;
        let sql = "UPDATE users SET email = '" + options2 + "', password = '" + options3 + "' where name = '" + options1 + "';"; // where name 성공하면, seq로 변경 후 재시도
        // let sql = controller.modifyInfo
        connection.query(sql, (err, result, fields) => {
          if(err) {
            console.error("UPDATE Error");
          } else {
            if(result === 0) {
              console.error("DB response NOT Found");
            } else {
              resolve(result);
              console.log("Update Data OK");
            };
          };
        });
        con.release();
      } catch(err) {
        console.error("pool UPDATE Error");
      };
    });
  });
};

// ★Read - Order List
modelsExports.renderOrder = () => {
  return new Promise((resolve, reject) => {
    con.getConnection((err, connection) => {
      try {
        if(err) throw err;
        console.log("Connection Success");
        
        // let sql = "INSERT INTO mypage_test1 (userid, name, email, addr) VALUES ('user4', 'testname', 'testemail', 'testaddr');";
        
        let sql = "SELECT * FROM mypageitem;";
        connection.query(sql, (err, result, fields) => {
          if(err) console.error("INSERT Error");
          else {
            if(result === 0) console.error("DB response NOT Found");
            else {
              resolve(result);
              console.log("TEST OK");
            };
          };
        });
        con.release();
      } catch(err) {
        console.error("pool Error");
      };
    });
  });
};

// ★Read - Subs List
modelsExports.renderSubs = () => {
  return new Promise((resolve, reject) => {
    con.getConnection((err, connection) => {
      try {
        if(err) throw err;
        console.log("Connection Success");
        
        // let sql = "INSERT INTO mypage_test1 (userid, name, email, addr) VALUES ('user4', 'testname', 'testemail', 'testaddr');";
        
        let sql = "SELECT * FROM mypagesub;";
        connection.query(sql, (err, result, fields) => {
          if(err) console.error("INSERT Error");
          else {
            if(result === 0) console.error("DB response NOT Found");
            else {
              resolve(result);
              console.log("TEST OK");
            };
          };
        });
        con.release();
      } catch(err) {
        console.error("pool Error");
      };
    });
  });
};


// ★Read - Product List
modelsExports.renderProd = () => {
  return new Promise((resolve, reject) => {
    con.getConnection((err, connection) => {
      try {
        if(err) throw err;
        console.log("Connection Success");
        
        // let sql = "INSERT INTO mypage_test1 (userid, name, email, addr) VALUES ('user4', 'testname', 'testemail', 'testaddr');";
        
        let sql = "SELECT * FROM mypageitem;";
        connection.query(sql, (err, result, fields) => {
          if(err) console.error("INSERT Error");
          else {
            if(result === 0) console.error("DB response NOT Found");
            else {
              resolve(result);
              console.log("TEST OK");
            };
          };
        });
        con.release();
      } catch(err) {
        console.error("pool Error");
      };
    });
  });
};