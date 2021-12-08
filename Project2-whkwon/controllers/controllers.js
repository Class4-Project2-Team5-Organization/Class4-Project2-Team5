// <정의>
// 1) views의 pug파일 form을 브라우저에서 열 수 있게 함수를 정의하는 곳
// 2) 여기서 함수를 작성 후 routes 폴더에서 만든 routes.js의 router를 적어 app.js에게 알린다

// <역할>
// 1) 내가 맡은 마이페이지 관련 실행 될 함수들 정의 (ex. render(파일) => 단, exports를 써야겠지)
// 2-1) require할 것들: models.js/db.js/

/*
★★★ 중요 ★★★
controller도 그냥 홈페이지만 띄우는 함수들(get) 따로 , 값 받아와서 처리하는 함수들(POST, DELETE, PUT등) 각각 다른 파일에 따로 작성
=> 페이지만 띄워주는 것과 처리가 필요한 페이지들을 구분하기 위함
★★★ 중요 ★★★
*/

const models = require("../models/models");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ★핵심: 요청을 받았을 때 어떤 "미들웨어" 실행할래? => 해당 미들웨어 함수를 routes.js에서 실행
// Read - My Page
exports.rendermypage = (req, res) => {
  models.readMypage().then((result) => {
    res.render("result-myPage", {
      userName: result[2].name,
      userEmail: result[2].email,
      userAddr: result[2].addr,
    });
  });
};

// Before Update - infoModify
exports.rendermypageModify = (req, res) => {
  // input value=변수 => 벡틱+$ => `${변수}`
  models.readMypage().then((result) => {
    res.render("infoModify", {
      username: result[2].name,
      useremail: result[2].email,
      useraddr: result[2].addr,
    });
  });
};

// After Update - My page(patch)
exports.rendermypageButton = (req, res) => {
  // ★★ PK/FK 구현 후 해당 값으로 바꿔야 함 ★★ or 각자 테이블 쓸꺼면 이대로 가도 될 듯
  exports.modifyInfo = {
    name: req.body.modiname,
    email: req.body.modiemail,
    addr: req.body.modiaddr,
  };
  // exports.modifyInfo = "UPDATE mypage_test1 SET email = '1234556' where name = 'testName';";
  console.log(req.body);
  models.updateMypage().then(() => {
    res.redirect("http://localhost:3000/mypage");
  });
};

// Order Page
exports.renderOrderpage = (req, res) => {
  models.renderSubs().then((result) => {
    res.render("myOrder", {
      subsName: result[0].subsname,
      subsDetail: result[0].subsdetail,
      subsDate: result[0].subsdate,
      subsPeriod: result[0].subsperiod,
    });
    models.renderProd().then((result) => { // 하나의 renderOrderpage에서 subs만 되고 prod는 안됨(일단 나중에 하고 차후 고민해야됨)
      res.render("myOrder", {
        prodName: result[0].prodname,
        prodCate: result[0].prodcate,
        prodPrice: result[0].prodprice,
        prodDate: result[0].proddate,
      });
    });
  });
};


exports.rendermypageModify2 = (req, res) => {
  res.render("result-myPage");
};

exports.rendermypageQna = (req, res) => {
  res.render("qna");
};

exports.rendermypageQnaPost = (req, res) => {
  res.render("qnaList");
};

exports.rendermypageQnaList = (req, res) => {
  res.render("qnaList");
};
