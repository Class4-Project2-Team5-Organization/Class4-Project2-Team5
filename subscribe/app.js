const express = require("express");
const path = require('path');
const mysql = require('./dbcon.js');
// const router = require("./routers/test");
const testRouter = require("./routers/test")

const app = express();
const host = "127.0.0.1";
const port = 3000;
app.use("/test", testRouter);

app.set("views", './views');
app.set('view engine', 'ejs');


app.use(express.static('public'));



// app.get('/' ,(req, res) => {
//     // res.redirect('/test')
//     res.render('./subscribe.ejs');
// });

app.get('/', (req, res) => {
    // const sql = "SELECT * FROM users";
    // mysql.getConnection((err, connection) => {
    //     if(err) throw err;
    //     connection.query(sql, (err, result, fields) =>{
    //         if(err) throw err;
    //         console.log(result);
    //     });
    //     connection.release();
    // });

    res.render('./subscribe.ejs');
});


app.listen(port, host, () => {
    console.log(`Application server running at http://${host}:${port}/`);
});