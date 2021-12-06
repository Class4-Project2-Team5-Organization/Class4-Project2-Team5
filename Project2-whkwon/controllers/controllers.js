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

var models = require("../models/models");


// ★핵심: 요청을 받았을 때 어떤 "미들웨어" 실행할래? => 해당 미들웨어 함수를 routes.js에서 실행
// Read - My Page
exports.rendermypage = (req, res) => {
    models.readMypage().then((result) => {
        res.render("myPage", {userName: result[2].name, userEmail: result[2].email, userAddr: result[2].addr});
    });
};

exports.rendermypageButton = (req, res) => {
    res.render("infoModify");
};

exports.rendermypageModify = (req, res) => {
    res.render("infoModify");
};

exports.rendermypageModify2 = (req, res) => {
    res.render("myPage");
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
