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

exports.fetchUser = async (req,res) => {
    let list = await User.find({}).lean()
    res.status(200).send(JSON.stringify(list))
}

exports.getUser = async (req,res) => {
    const userId = req.body.id;
    let user = await User.findById(userId)
    res.status(200).send(user)
   
}