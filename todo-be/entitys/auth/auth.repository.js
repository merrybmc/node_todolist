const User = require('../users/User.Schema');
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

module.exports = authController;
