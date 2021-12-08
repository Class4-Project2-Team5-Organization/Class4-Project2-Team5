// const router = require("express").Router();
const { body } = require("express-validator");
const express = require("express");
const router = express.Router();
const controller = require("./controllers/controllers.js");
require("./models/models");


const {
    homePage,
    register,
    registerPage,
    login,
    loginPage
} = require("./controllers/userController");

const ifNotLoggedin = (req, res, next) => {
    if(!req.session.userID){
        return res.render("main") // 로그인이 안되어있을 시 main으로 이동.
        // return res.redirect('/login');
    }
    next();
}

const ifLoggedin = (req,res,next) => {
    if(req.session.userID){
        return res.redirect('/');
    }
    next();
}

router.get('/', ifNotLoggedin, homePage);

router.get("/login", ifLoggedin, loginPage);
router.post("/login",
ifLoggedin,
    [
        body("_email", "Invalid email address")
            .notEmpty()
            .escape()
            .trim()
            .isEmail(),
        body("_password", "The Password must be of minimum 4 characters length")
            .notEmpty()
            .trim()
            .isLength({ min: 4 }),
    ],
    login
);

router.get("/signup", ifLoggedin, registerPage);
router.post(
    "/signup",
    ifLoggedin,
    [
        body("_name", "The name must be of minimum 3 characters length")
            .notEmpty()
            .escape()
            .trim()
            .isLength({ min: 3 }),
        body("_email", "Invalid email address")
            .notEmpty()
            .escape()
            .trim()
            .isEmail(),
        body("_password", "The Password must be of minimum 4 characters length")
            .notEmpty()
            .trim()
            .isLength({ min: 4 }),
    ],
    register
);

router.get('/logout', (req, res, next) => {
    req.session.destroy((err) => {
        next(err);
    });
    res.redirect('/login');
});

// ------------- mypage ----------------
// ★핵심: ("경로", "미들웨어 함수") 만 적는다. 미들웨어는 controllers에서 관리
// GET
// => Form method에서 'GET으로 호출하지 않음'. 단순 해당 path로 진입 시 page를 띄우기 위해 작성(form 요청이 없어도 default가 get이기에 아래 route 작성만 해도 기능 동작 가능)
router.get('/mypage', controller.rendermypage); // ★mypage의 메인이자 시작페이지이므로 최소의 get이 필요해서 작성
// router.get('/modify', controller.rendermypageModify); // ★밑에 post방식을 타고 들어가지 않는 이상 url에 직접 /modify 입력시 접근 불가
// myorder 페이지 렌더 test
router.get('/myorder', controller.renderOrderpage);

// TEST FK
// router.get('/qna', controller.testFKcont);

// router.get('/qna', controller.rendermypageQna);
router.get('/qnalist', controller.rendermypageQnaList);

// POST
router.post('/modify', controller.rendermypageModify); // 'result-myPage' => 'infoModify'
router.post('/result_modify', controller.rendermypageButton); // 'infoModify' => 'result-myPage(redirect)' : result-myPage의 data를 이어 받아서 data 수정


router.post('/qna', controller.rendermypageQnaPost);

module.exports = router;