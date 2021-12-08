const Roles = require("../models/role.model");
const User = require("../models/user.model");

checkAvaiable = (req, res, next) => {
    //Check Duplicate Username
    User.findOne({ name: req.body.username }).exec((err, user) => {
        //console.log(req.body)
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (user) {
            res.status(400).send({ message: "Tên đăng nhập đã được sử dụng." });
            return;
        }

        //Check Duplicate Email
        User.findOne({ email: req.body.email }).exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (user) {
                res.status(400).send({ message: "Email đã được sử dụng" });
                return;
            }

            next();
        })
    })
}
//Check If Role Are In DB
checkRoleAvaiable = (req, res, next) => {
    if (req.body.roles) {
        let i = 0;
        for (i; i < req.body.roles.length; i++) {
            if (!Roles.findOne(req.body.roles[i])) {
                res.status(400).send({ message: `Không tồn tại quyền ${req.body.roles[i]} trong dữ liệu` });
                return;
            }
        }
    }

    next();
}

const verifySignUp = {
    checkAvaiable,
    checkRoleAvaiable
};

module.exports = verifySignUp;