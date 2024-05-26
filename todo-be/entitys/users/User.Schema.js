const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.password;
  return obj;
};

userSchema.methods.generateToken = function () {
  const token = jwt.sign({ _id: this._id }, JWT_SECRET_KEY);
  return token;
};

// userSchema.methods.setToken = function (res, token) {
//   const options = {
//     httpOnly: true,
//     sameSite: 'none', // 서버와 클라이언트가 동일한 도메인이 아니더라도 가능하게
//     secure: true, // sameSite를 none으로 설정했을 때 설정
//   };
//   console.log('c');
//   res.status(200).cookie('token', token, options); // 일반 쿠키가 아닌 HTTP-ONLY Cookie 설정
// };

const User = mongoose.model('User', userSchema);

module.exports = User;
