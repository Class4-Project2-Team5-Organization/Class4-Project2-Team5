const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const testRouter = require("./router/index");
const mysql = require("./dbcon");

const app = express();
const host = "127.0.0.1";
const port = 3000;
app.use("/index", testRouter);

app.set('view engine', 'ejs');
app.set('views', __dirname+'/views');

app.use(bodyParser.urlencoded({ extended: true}));
app.use("/public", express.static('public'));
app.use('/css',express.static(__dirname+'/assets/css/main.css'));
app.use('/js',express.static(__dirname+'/views/function.js'));

app.get("/product_list", (req, res) => {
    const sql = `select * from product`;
    try {
        mysql.getConnection((err, connection) => {
            console.log("connection_pool GET");
            if(err) throw err;
            connection.query(sql, (err, result, fields) => {
                if(err) {
                    console.error("connection_pool GET Error / " + err);
                    res.status(500).send("message : Internal Server Error");
                } else {
                    if(result.length === 0){
                        res.status(400).send({
                            success : false,
                            message : "DB response Not Found"
                        })
                    } else {
                        res.render('ProductList', {product : result});
                    };
                };
            });
            connection.release();
        })
    } catch (err) {
        console.error("connection_pool GET Error / " + err);
        res.status(500).send("message : Internal Server Error");
        connection.release(); // 에러를 받아서 반납을 해준다
    }
});


app.listen(port, host, () => {
    console.log(`Application server running at http://${host}:${port}/`);
});
