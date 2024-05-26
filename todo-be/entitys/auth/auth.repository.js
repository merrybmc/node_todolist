const User = require('../users/User.Schema');
const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
require('dotenv').config();

const authController = {};

authController.validEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      throw new Error('이미 가입이 된 유저입니다.');
    }
  } catch (e) {
    req.statusCode = 400;
    req.error = e.message;
  }
  next();
};

authController.authenticate = async (req, res, next) => {
  try {
    // const authHeader = req.get('Authrization');

    const token = req.cookies['token'];
    let result = '';

    jwt.verify(token, JWT_SECRET_KEY, (error, payload) => {
      if (error) {
        throw new Error('토큰이 유효하지 않습니다.');
      } else {
        result = payload._id;
      }
    });
    req.validTokenId = result;
  } catch (e) {}
  next();
};

authController.logout = async (req, res, next) => {
  try {
    const token = req.cookies['token'];

    if (!token) throw new Error('로그인 상태가 아닙니다.');

    res.clearCookie('token', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
  } catch (e) {
    req.statusCode = 400;
    req.error = e.message;
  }
};

module.exports = authController;
