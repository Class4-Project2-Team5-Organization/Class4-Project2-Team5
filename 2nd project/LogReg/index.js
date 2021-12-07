const express = require('express');
const session = require('express-session');
const path = require('path');
const routes = require('./routes');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();
const mysql = require('mysql');



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(session({
    name: 'session',
    secret: 'my_secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 3600 * 1000, // 1hr
    }
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

app.use((err, req, res, next) => {
    // console.log(err);
    return res.send('Internal Server Error');
});


// ------게시판 로직--------

const dbConnection = mysql.createPool({
    host: 'localhost', // 사용할 host로 변경
    user: 'root', // 본인이 사용할 user로 변경
    password: 'wlsrud20', // 본인 mysql 접속 비밀번호으로 변경해서 저장할 것.
    database: 'testmerge' 
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/review', (req,res)=>{
    let sql = "select * from reviewboard";
    let query = dbConnection.query(sql,(err,rows)=>{ 
        if(err) throw err;
        res.render("user_index", {
            title: "서비스 후기게시판입니다.",
            users : rows
        });
    });
});

app.get('/review_add',(req,res)=>{
    // users 테이블의 name을 reviewboard의 name으로 대입
    res.render("user_add", {
        title: "게시글 작성",
    });
})

app.post('/save',(req,res)=>{
    let data = {name: req.body.name, title : req.body.title, message : req.body.message};
    let sql = "insert into reviewboard SET ?";
    let query = dbConnection.query(sql, data,(err, results)=>{
        if(err) throw err;
        res.redirect('/review');
    });
    let namesql = 'insert into reviewboard (name) select (name) from users';
    let namequery = dbConnection.query(namesql, (err,results)=>{
        if(err) throw err;
        console.log("reviewboard 확인");
    })
});

app.get('/edit/:userid',(req,res)=>{
    const userId = req.params.userid;
    let sql = `select * from reviewboard where id=${userId}`;
    let query = dbConnection.query(sql, (err,result)=>{
        if(err) throw err;
        res.render('user_edit',{
            title:'게시글 편집',
            user : result[0]
        });
    });
});

app.post('/update', (req, res) => {
    const userId = req.body.id;
    let sql = "update reviewboard SET name='" + req.body.name + "', title='" + req.body.title +"', message='" + req.body.message +"' where id="+userId;
    let query = dbConnection.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect('/review');
    });
});

app.get('/delete/:userid', (req, res) => {
    const userId = req.params.userid;
    let sql = `DELETE from reviewboard where id=${userId}`;
    let query = dbConnection.query(sql, (err, result) => {
        if (err) throw err;
        res.redirect('/review');
    });
});


app.listen(3000, () => console.log('Server is runngin on port http://localhost:3000'));