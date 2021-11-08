const { verifySignUp } = require("../middleware");
const controller = require("../controller/authenticate.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/signup",
        [
            verifySignUp.checkAvaiable,
            verifySignUp.checkRoleAvaiable
        ],
        controller.signup
    );

    app.post("/signin", controller.signin);


};
