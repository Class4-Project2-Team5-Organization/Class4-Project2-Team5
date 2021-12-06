const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const dbConnection = require("../utils/dbConnection");

// Home Page
exports.homePage = async (req, res, next) => {
    // homePage는 애초에 로그인을 한 것을 전제로 해서 아래 쿼리문을 통해 유저정보를 가져와 화면에 뿌린다.
    const [row] = await dbConnection.execute("SELECT * FROM `testmerge` WHERE `id`=?", [req.session.userID]);

    if (row.length !== 1) { // 여기서 로그인에 실패하면 다시 홈페이지로 돌아가도록 설정할 것
        return res.redirect('/logout');
    }
    // 여기서의 user: row[0]는 원본 homePage에서 뿌려준 것처럼 마이페이지에서 뿌려주면 될 것.
    res.render("main", {
        user: row[0]
    });
    console.log("로그인 성공, 회원정보 : ", row[0]);
}

// Register Page
exports.registerPage = (req, res, next) => {
    res.render("register");
};

// User Registration
exports.register = async (req, res, next) => {
    const errors = validationResult(req);
    const { body } = req;

    if (!errors.isEmpty()) {
        return res.render('register', {
            error: errors.array()[0].msg
        });
    }

    try {

        const [row] = await dbConnection.execute(
            "SELECT * FROM `testmerge` WHERE `email`=?",
            [body._email]
        );

        if (row.length >= 1) {
            return res.render('register', {
                error: 'This email already in use.'
            });
        }

        const hashPass = await bcrypt.hash(body._password, 12);

        const [rows] = await dbConnection.execute(
            "INSERT INTO `testmerge`(`name`,`email`,`password`) VALUES(?,?,?)",
            [body._name, body._email, hashPass]
        );

        if (rows.affectedRows !== 1) {
            return res.render('register', {
                error: 'Your registration has failed.'
            });
        }
        
        res.render("register", { msg: 'You have successfully registered.' }, () => {
            req.session.destroy((err) => {
                next(err);
            });
            res.redirect('/login');
        });

    } catch (e) {
        next(e);
    }
};

// Login Page
exports.loginPage = (req, res, next) => {
    res.render("login");
    // res.render("test");
    // res.send("test");
};

// Login User
exports.login = async (req, res, next) => {

    const errors = validationResult(req);
    const { body } = req;

    if (!errors.isEmpty()) {
        return res.render('login', {
            error: errors.array()[0].msg
        });
    }

    try {

        const [row] = await dbConnection.execute('SELECT * FROM `testmerge` WHERE `email`=?', [body._email]);

        if (row.length != 1) {
            return res.render('login', {
                error: 'Invalid email address.'
            });
        }

        const checkPass = await bcrypt.compare(body._password, row[0].password);

        if (checkPass === true) {
            req.session.userID = row[0].id;
            return res.redirect('/');
        }

        res.render('login', {
            error: 'Invalid Password.'
        });


    }
    catch (e) {
        next(e);
    }

}
