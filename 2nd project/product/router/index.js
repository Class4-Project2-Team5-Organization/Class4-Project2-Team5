const express = require("express");
const router = express.Router();
const path = require('path');
const mysql = require('../dbcon');

router.get('/product_list', (req, res) => {
  connection.release(); // 추가 
});

router.get('/product_detail/:id', (req, res) => {  
  connection.release(); // 추가 
});

router.post("/cart", (req, res) => {  
      connection.release();
  });
// res.redirect("/")

// router.get('/product_list', (req, res) => {
//   let sql = `select * from product` 
//   con.query(sql, function(err, result, fields) {
//       if(err) throw err;
//       res.render('ProductList', {product : result});
//   });
//   connection.release(); // 추가 
// });

// router.get('/product_detail/:id', (req, res) => {
//   let sql = `select * from product
//   where name = '면도세트 12개입'`
//   con.query(sql, function(err, result, fields) {
//       if(err) throw err;
//       res.render('ProductDetail', {product : result});
//   });
//   connection.release(); // 추가 
// });

// router.post("/cart", (req, res) => {
//   const sql = `INSERT INTO cart (user_name, product_id, quantity) VALUES ('test', '1', '1')`;
//   mysql.getConnection((err, connection) => {
//       if(err) throw err;
//       connection.query(sql, (err, result) =>{
//           if(err) throw err;
//           console.log(result);
//       });
//       connection.release();
//   });
//   res.redirect("/")

// });


module.exports = router;