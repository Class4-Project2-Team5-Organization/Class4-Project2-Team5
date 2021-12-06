// 마이페이지에서 실행 될 함수들 부르는 url 입력 시(아마 controller?) "실행 될 함수 이름만 적기"
// ★여긴 단순하게 "어떤 함수를 실행할 건지만 간단하게 적고, 그 함수를 정의(실행)가 어떻게 되는지 자세한 코드는 controllers.js에서 실행"
// 즉, 단순히 불러온다 라는 개념에서 routes.js를 쓰고 불러서 뭐 할꺼냐? 라는 함수 정의는 controllers.js에서 할 것

const express = require("express");
const router = express.Router();
const controller = require("../controllers/controllers.js");
require("../models/models");


// ★핵심: ("경로", "미들웨어 함수") 만 적는다. 미들웨어는 controllers에서 관리
// GET
router.get('/mypage', controller.rendermypage);
router.get('/modify', controller.rendermypageModify);
router.get('/qna', controller.rendermypageQna);
router.get('/qnalist', controller.rendermypageQnaList);

// POST
router.post('/modify', controller.rendermypageModify); // result-myPage => infoModify
router.post('/result_modify', controller.rendermypageButton);
router.post('/qna', controller.rendermypageQnaPost);

module.exports = router;