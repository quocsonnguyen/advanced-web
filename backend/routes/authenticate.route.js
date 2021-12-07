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
        "/api/signup",
        [
            verifySignUp.checkAvaiable,
            verifySignUp.checkRoleAvaiable
        ],
        controller.signup
    );


    app.post(
        "/api/google/signup",
        controller.googleSignup
    );

    app.post("/api/signin", controller.signin);

    app.get("/api/:gid/isValid", controller.isGoogleUserValid);

    app.get("/api/getRole/:roleID", controller.getRole)

};
