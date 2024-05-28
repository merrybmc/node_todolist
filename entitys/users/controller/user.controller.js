const bcrypt = require('bcryptjs');
const User = require('../User.Schema');
const authController = require('../../auth/auth.repository');

const userController = {};

// 회원가입
userController.createUser = async (req, res, next) => {
  try {
    if (req.statusCode === 400) return next();

    const { name, email, password } = req.body;

    if (!name) {
      throw new Error('이름이 비어있습니다.');
    }
  } catch (e) {
    req.statusCode = 400;
    req.error = e.message;
  }
  next();
};

// 로그인
userController.loginWithEmail = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) throw new Error('가입이 되어있지 않은 이메일입니다.');

    const isMath = bcrypt.compareSync(password, user.password);
    if (!isMath) throw new Error('비밀번호가 일치하지 않습니다.');

    req.user = user;
  } catch (e) {
    req.statusCode = 400;
    req.error = e.message;
  }
  next();
};

// 유저 정보 조회
userController.getUser = async (req, res, next) => {
  try {
    const { validTokenId } = req;

    const user = await User.findById(validTokenId);

    if (!user) throw new Error('존재하지 않는 회원입니다.');

    req.user = user;
  } catch (e) {
    req.statusCode = 400;
    req.error = e.message;
  }
  next();
};

// 로그아웃
userController.logout = async (req, res, next) => {
  try {
    await authController.logout(req, res, next);
    next();
  } catch (e) {
    req.statusCode = 400;
    req.error = e.message;
  }
};

module.exports = userController;
