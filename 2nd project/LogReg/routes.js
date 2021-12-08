const router = require("express").Router();
const { body } = require("express-validator");

const {
    homePage,
    register,
    registerPage,
    login,
    loginPage,
    subscribe1,
    subscribe2,
    subscribe3
} = require("./controllers/userController");

const ifNotLoggedin = (req, res, next) => {
    if (!req.session.userID) {
        return res.render("main") // 로그인이 안되어있을 시 main으로 이동.
        // return res.redirect('/login');
    }
    next();
}

const ifLoggedin = (req, res, next) => {
    if (req.session.userID) {
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



router.post("/a", subscribe1, (req, res) => {

    res.redirect("/")
});


router.post("/b", subscribe2, (req, res) => {

    res.redirect("/subscribe")
});

router.post("/c", subscribe3, (req, res) => {

    res.redirect("/subscribe")

});

module.exports = router;