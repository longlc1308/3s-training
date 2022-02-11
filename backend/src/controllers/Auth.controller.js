const User = require("../models/User.model");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const emailSend = require("../middlewares/email")

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
      if(originalPassword !== req.body.password)
        return res.status(400).json({ msg: "Password khong chinh xac" });
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

  // FORGOT PASSWORD
  forgotPassword = async (req, res, next) => {
    try {
      const user = await User.findOne({email: req.body.email});
      if(!user){
        return res.status(400).json({msg: 'Email không tồn tại'});
      }
      else{
        const token = jwt.sign({
          id: user._id,
          role: user.role,
        },
        process.env.RESET_SEC,
        { expiresIn: "300s" });
        const result = await user.updateOne({ reset_token: token })
        if(!result){ 
          return res.status(400).json({ msg: 'Invalid token' })
        }
        else{
          const resetLink = `http://localhost:3000/reset-password/${token}`;
          var dynamic_template_data = {
            resetUrl: resetLink
          }
          emailSend.sendTemplate(req.body.email, 'longluucong1308@gmail.com', 'd-be72a2de038c4a02afcf9de1faf0ce0d', dynamic_template_data);
          return res.status(200).json({msg: 'Success'})
        } 
      }
    } catch (error) {
      res.status(400).json({ msg: "Failed"})
    }
  }

  // RESET PASSWORD
  resetPassword = async (req, res, next) => {
    try {
      const token = req.params.token;
      if(token){
        const resetToken = jwt.verify(token, process.env.RESET_SEC);
        if(!resetToken) return res.status(400).json({msg: 'Invalid token'})
        const new_info = {
          password: CryptoJS.AES.encrypt(
            req.body.newPassword,
            process.env.PASS_SEC
          ).toString(),
          reset_token: ""
        }
        await User.updateOne({reset_token: token}, new_info);
        return res.status(200).json({msg: 'Reset password successfully'})
      }
    } catch (error) {
      res.status(400).json({ msg: 'Reset password failed'})
    }
  }
}

module.exports = new AuthController();
