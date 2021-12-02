const exprss = require("express");
const app = exprss();

app.set('view engine', 'pug');
app.set('views', './views');
app.use(exprss.static("views"));
const host = '127.0.0.1';
const port = 3000;

app.get('/', (req, res) => {
    res.render('indexpug');
}); 

app.listen(port, host, ()=>{
    console.log(`Index appliction running at http://${host}:${port}/`);
});

//test upload