const jwt = require("jsonwebtoken");
const config = require("../config/authenticate.config");

const User = require("../models/user.model");
const Role = require("../models/role.model");

verifyToken = (req,res,next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({message: "Không có token"});
    }

    jwt.verify(token, config.secret, (err,decoded) => {
        if (err) {
            return res.status(401).send({message: "Không có quyền truy cập"});
        }
        req.userId = decoded.id;
        next();
    })
}

isAdmin = (req,res,next) => {
    User.findById(req.userId).exec((err,user)=>{
        if(err){
            res.status(500).send({message: err});
            return;
        }

        Role.find({_id: {$in: user.roles} }, (err,roles) => {
            if(err) {
                res.status(500).send({message: err});
                return
            }

            let i = 0;
            for(i;i< roles.length;i++){
                if(roles[i].name === "admin"){
                    next();
                    return;
                }
            }

            res.status(403).send({message: "Cần Quyền Admin"});
            return;
        })
    })
}

isFalculty = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        Role.find(
            {
                _id: { $in: user.roles }
            },
            (err, roles) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === "falculty") {
                        next();
                        return;
                    }
                }

                res.status(403).send({ message: "Cần Quyền Phòng Khoa" });
                return;
            }
        );
    });
};

const jwtAuth = {
    verifyToken,
    isAdmin,
    isFalculty
};
module.exports = jwtAuth;

