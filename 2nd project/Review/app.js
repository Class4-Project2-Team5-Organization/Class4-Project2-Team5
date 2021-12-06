const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'wlsrud20', //본인 root계정 비밀번호작성
    database: 'orthodox_review'
}); 

connection.connect( (err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/review', (req,res)=>{
    let sql = "select * from testmerge";
    let query = connection.query(sql,(err,rows)=>{ 
        if(err) throw err;
        res.render("user_index", {
            title: "서비스 후기게시판입니다.",
            users : rows
        });
    });
});

app.get('/review_add',(req,res)=>{
    res.render("user_add", {
        title: "게시글 작성",
    });
})

app.post('/save',(req,res)=>{
    let data = {name : req.body.name, email : req.body.email, title : req.body.title, message : req.body.message};
    let sql = "insert into testmerge SET ?";
    let query = connection.query(sql, data,(err, results)=>{
        if(err) throw err;
        res.redirect('/review');
    });
});

app.get('/edit/:userid',(req,res)=>{
    const userId = req.params.userid;
    let sql = `select *from testmerge where id=${userId}`;
    let query = connection.query(sql, (err,result)=>{
        if(err) throw err;
        res.render('user_edit',{
            title:'게시글 편집',
            user : result[0]
        });
    });
});

app.post('/update', (req, res) => {
    const userId = req.body.id;
    let sql = "update testmerge SET name='" + req.body.name + "', email='" + req.body.email + "', title='" + req.body.title +"', message='" + req.body.message +"' where id="+userId;
    let query = connection.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect('/review');
    });
});

app.get('/delete/:userid', (req, res) => {
    const userId = req.params.userid;
    let sql = `DELETE from testmerge where id=${userId}`;
    let query = connection.query(sql, (err, result) => {
        if (err) throw err;
        res.redirect('/review');
    });
});


//Server Listening
app.listen(3000,()=>{
    console.log('Server is running at port http://localhost:3000/review');
});