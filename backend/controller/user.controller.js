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