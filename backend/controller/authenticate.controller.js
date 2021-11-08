//Modeling
const User = require("../models/user.model");
const Role = require("../models/role.model");
const config = require("../config/authenticate.config")
//Library
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


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

//Signin Handler
exports.signin = (req,res) => {
    User.findOne({ email: req.body.email }).populate("roles").exec((err,user) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }

        if (!user) {
            return res.status(404).send({message: "Tài khoản không tồn tại"});
        }

        var checkPassword = bcrypt.compareSync(
            req.body.password,
            user.password
        )

        if(!checkPassword) {
            return res.status(401).send({
                //accessToken: null,
                message: "Sai Password!"
            })
        }

        var token = jwt.sign({id: user.id}, config.secret, {
            expiresIn: 43200
        })

        var authorities = [];
        let i = 0;
        for(i;i<user.roles.length;i++){
            authorities.push("Role: "+user.roles[i].name.toUpperCase());

        }
        res.status(200).send({
            id: user._id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token
        });  
    })

}