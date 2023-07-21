import { User } from '../user/user-model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { validationResult, check } from 'express-validator';

const signup = async (req, res) => {
  try {
    const { username, email, address, method } = req.body;
    if (method == 1) {
      let newUserName = username.toLowerCase().replace(/ /g, '');
      const userPassword = Math.random().toString(36).slice(-8);
      const passwordHash = await bcrypt.hash(userPassword, 12);

      const newUser = new User({
        username: newUserName,
        email,
        password: passwordHash,
      });
      await newUser.save();
      let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        secure: false,
        port: 587,
        auth: {
          user: 'zainengr00@gmail.com',
          pass: 'zmtbnbahxulpekgd',
        },
      });

      const mailOptions = {
        from: 'zainengr00@gmail.com',
        to: email,
        text: `Welcome ${username}! Your password is ${userPassword}.`,
        html: `<p>Welcome <b>${username}</b>! Your password is <b>${userPassword}</b>.</p>`,
      };
      transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
          console.log(err);
        } else {
          console.log(info);
        }
      });
      return res.status(200).json({
        msg: 'User was registered successfully! Please check your email',
      });
    } else {
      const newUser = new User({
        address,
      });
      await newUser.save();
      return res.status(200).json({
        msg: 'User was registered successfully!',
      });
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, address, method } = req.body;
    let user = await User.findOne({ email: email });
    if (method == 1) {
      const access_token = createAccessToken({ id: user._id });
      res.json({
        msg: 'Login Success!',
        access_token,
      });
    } else {
      let user = await User.findOne({ address: address });
      const access_token = createAccessToken({ id: user._id });

      res.json({
        msg: 'Login Success!',
        access_token,
      });
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie('refreshtoken', { path: '/api' });
    return res.json({ msg: 'Logged out!' });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
};

export { signup, login, logout };
