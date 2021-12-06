// "최상위 파일"
// db, controllers, routes, models 등 전부 require하고 최종적으로 "서버 실행하는 곳"

var dataIn = require("./models/models");
var router = require("./routes/routes");
const express = require("express");
const app = express();

app.set("view engine", "pug");
app.set("views"); // 앞에 views(디렉터리)만 설정하면 해당 폴더 안에 모든 파일 접근 가능한 것 같음

app.use('/', router); // 일단 app.js에서 router를 긁어오긴 했는데, 이거 따로 못빼나?????????

const port = 3000;
const host = "127.0.0.1";

app.listen(port, host, () => {
    console.log(`Application Server running at http://${host}:${port}/mypage`);
});