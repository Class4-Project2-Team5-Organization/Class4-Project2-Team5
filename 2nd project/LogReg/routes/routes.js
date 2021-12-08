// 마이페이지에서 실행 될 함수들 부르는 url 입력 시(아마 controller?) "실행 될 함수 이름만 적기"
// ★여긴 단순하게 "어떤 함수를 실행할 건지만 간단하게 적고, 그 함수를 정의(실행)가 어떻게 되는지 자세한 코드는 controllers.js에서 실행"
// 즉, 단순히 불러온다 라는 개념에서 routes.js를 쓰고 불러서 뭐 할꺼냐? 라는 함수 정의는 controllers.js에서 할 것

const express = require("express");
const router = express.Router();
const controller = require("../controllers/controllers.js");
require("../models/models");


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