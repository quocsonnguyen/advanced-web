//Modeling
const User = require("../database/models/user.model");
const Role = require("../database/models/role.model");
//Library
const bcrypt = require("bcryptjs");


//Signup Handler
exports.signup = (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });

    user.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (req.body.roles) {
            Role.find({
                name: { $in: req.body.roles }
            }, (err, roles) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                user.roles = roles.map(role => role._id);
                user.save((err) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    res.send({message: "Đăng ký thành công"})
                })
            })
        } else {
            res.send({message: "Chưa thêm quyền"});
            return;
        }
    })
}