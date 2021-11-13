const { jwtAuth } = require("../middleware");
const controller = require("../controller/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/all", controller.allAccess);

  app.get("/student", [jwtAuth.verifyToken], controller.userBoard);

  app.get(
    "/falculty",
    [jwtAuth.verifyToken, jwtAuth.isFalculty],
    controller.falcultyBoard
  );

  app.get(
    "/admin",
    [jwtAuth.verifyToken, jwtAuth.isAdmin],
    controller.adminBoard
  );
};
