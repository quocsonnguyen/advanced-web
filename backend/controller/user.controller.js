exports.allAccess = (req, res) => {
    res.status(200).send("Trang mở.");
};

exports.userBoard = (req, res) => {
    res.status(200).send("Trang Sinh Viên.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Trang Admin.");
};

exports.falcultyBoard = (req, res) => {
    res.status(200).send("Trang Phòng Khoa.");
};
const User = require("../models/user.model");


exports.fetchUser = async (req, res) => {
    var list = []
    
    let user_list = await User.find({}).populate("roles").lean()
    let i=0;
    for(i;i<user_list.length;i++){
        if(user_list[i].roles[0].name == "faculty"){
            list.push(user_list[i])                
        }
    }

    res.status(200).send(JSON.stringify(list))
}

exports.getUser = async (req, res) => {
    const userId = req.body.id;
    User.findById(userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.status(200).send(JSON.stringify(user))
    })


}