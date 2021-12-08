const { jwtAuth } = require("../middleware");
const controller = require("../controller/user.controller");
const fileUpload = require('../middleware/fileUpload');
const User = require("../models/user.model");
const bcrypt = require('bcryptjs')

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get('/fetchUser', controller.fetchUser)
  app.get('/getUserById', controller.getUser)
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


  app.post("/api/user/:uid/edit", fileUpload.single('avatar'), async (req, res) => {
    let uid = req.params.uid
    let fileName = req.body.avatar === '' ? '' : req.file.filename

    if (fileName) {
      await User.updateOne(
        { _id : uid }, 
        {
          name : req.body.name,
          image : req.file.filename
        }
      )
    } else {
      await User.updateOne(
        { _id : uid }, 
        {
          name : req.body.name
        }
      )
    }

    res.end()
  });

  app.get("/api/user/:uid", async (req, res) => {
    let uid = req.params.uid

    let user = await User.findOne(
      { _id : uid }
    ).lean()

    res.end(JSON.stringify(user))
  });

  app.post("/api/user/:uid/changePassword", async (req, res) => {
    let uid = req.params.uid
    let user = await User.findOne({ _id : uid }).lean()
    let match = bcrypt.compareSync(req.body.oldPassword, user.password)

    if (match) {
      let hashedNewPassword = bcrypt.hashSync(req.body.newPassword, 8)
      await User.updateOne(
        { _id : uid },
        {
          password : hashedNewPassword
        }
      )

      res.end(JSON.stringify({
        code : 0,
        msg : 'change password successfully'
      }))
    } else {
      res.end(JSON.stringify({
        code : -1,
        msg : 'old password is incorrect'
      }))
    }
  });
};
