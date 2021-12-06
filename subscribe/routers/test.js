const express = require("express");
const router = express.Router();
const path = require('path');
const mysql = require('../dbcon');


router.post("/a", (req, res) => {
    const sql = "INSERT INTO users (name, email) VALUES ('1111', '1111')";
    mysql.getConnection((err, connection) => {
        if(err) throw err;
        connection.query(sql, (err, result, fields) =>{
            if(err) throw err;
            console.log(result);
        });
        connection.release();
    });    
});


router.post("/b", (req, res) => {
    const sql = "INSERT INTO users (name, email) VALUES ('2222', '2222')";
    mysql.getConnection((err, connection) => {
        if(err) throw err;
        connection.query(sql, (err, result, fields) =>{
            if(err) throw err;
            console.log(result);            
        });
        connection.release();
    });

});

router.post("/c", (req, res) => {
    const sql = "INSERT INTO users (name, email) VALUES ('3333', '3333')";
    mysql.getConnection((err, connection) => {
        if(err) throw err;
        connection.query(sql, (err, result) =>{
            if(err) throw err;
            console.log(result);
        });
        connection.release();
    });
    res.redirect("/")

});


module.exports = router;