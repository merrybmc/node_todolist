const User = require('../users/User.Schema');
const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
require('dotenv').config();

const authController = {};

authController.authenticate = (req, res, next) => {
  try {
    const token = req.cookies['token'];
    if (!token) {
      throw new Error('invalid token');
    }
    jwt.verify(token, JWT_SECRET_KEY, (error, payload) => {
      if (error) throw new Error('invalid token');
      next();
    });
  } catch (e) {}
};

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

authController.validToken = async (req, res, next) => {
  try {
    // const authHeader = req.get('Authrization');

    const token = req.cookies['token'];
    const result = jwt.verify(token, JWT_SECRET_KEY, (error) => {
      if (error) throw new Error('토큰이 유효하지 않습니다.');
    });

    req.validTokenId = result;
  } catch (e) {
    req.statusCode = 400;
    req.error = e.message;
  }
  next();
};

module.exports = authController;
