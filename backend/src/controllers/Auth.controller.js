const User = require("../models/User.model");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

class AuthController {
  // REGISTER
  register = async (req, res, next) => {
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).json({ msg: "Email đã tồn tại" });
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
      ).toString(),
    });
    try {
      const savedUser = await newUser.save();
      const accessToken = jwt.sign(
        {
          id: savedUser._id,
          role: savedUser.role,
        },
        process.env.JWT_SEC,
        { expiresIn: "1h" }
      );
      const { password, ...others } = savedUser;
      res.status(200).json({
        user: { ...others, accessToken },
        msg: "Đăng ký thành công",
        expiresIn: 3600,
      });
    } catch (err) {
      res.status(400).json({ msg: "Đăng ký không thành công" });
    }
  };

  // LOGIN
  login = async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user)
        return res.status(404).json({ message: "Email khong ton tai" });
      const hashedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.PASS_SEC
      );
      const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
      originalPassword !== req.body.password &&
        res.status(401).json({ message: "Password khong chinh xac" });

      const accessToken = jwt.sign(
        {
          id: user._id,
          role: user.role,
        },
        process.env.JWT_SEC,
        { expiresIn: "1h" }
      );

      const { password, ...others } = user._doc;
      res.status(200).json({
        user: { ...others, accessToken },
        msg: "Đăng nhập thành công",
        expiresIn: 3600,
      });
    } catch (err) {
      res.status(400).json({ msg: "Đăng nhập không thành công" });
    }
  };
}

module.exports = new AuthController();
