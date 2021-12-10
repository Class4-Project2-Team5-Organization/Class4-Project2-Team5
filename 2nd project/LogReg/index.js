const express = require('express');
const session = require('express-session');
const path = require('path');
const routes = require('./routes');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();
const mysql = require('mysql');
// const productTable = require("./utils/dbcon");

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


app.get('/subscribe', (req, res) => {
    res.render('./subscribe.ejs');
});


const router = require("./routes/routes.js");
app.use('/', router); // 일단 app.js에서 router를 긁어오긴 했는데, 이거 따로 못빼나?????????

app.listen(3000, () => console.log('Server is runngin on port http://localhost:3000'));