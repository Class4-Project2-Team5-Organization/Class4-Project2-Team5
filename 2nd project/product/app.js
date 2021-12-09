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


app.get('/product_list', (req, res) => {
    const sql = `select * from product`
    mysql.query(sql, function(err, result, fields) {
        if(err) throw err;
        res.render('ProductList',{product : result});
    });
});

app.post('/detail', (req, res) =>{
    var productId = req.body.productid
    console.log(req.body.productid)
    let sql = `select * from product where id=${productId}` 
    mysql.query(sql, function(err, result, fields){
        if(err) throw err;
        res.render('ProductDetail', {product : result})
    });
});

app.post('/order', (req, res) => {
    var productId = req.body.productid    
    let sql = `select * from product where id=${productId}` 
    mysql.query(sql, function(err, result, fields){
        if(err) throw err;        
        res.render('Order', {product : result})        
    })
});


app.listen(port, host, () => {
    console.log(`Application server running at http://${host}:${port}/`);
});
