const bcrypt = require('bcrypt');
const User = require('../User.Schema');

const userController = {};

userController.createUser = async (req, res, next) => {
  try {
    if (req.statusCode === 400) return next();

    const { name } = req.body;

    if (!name) {
      throw new Error('이름이 비어있습니다.');
    }
  } catch (e) {
    req.statusCode = 400;
    req.error = e.message;
  }
  next();
};

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

userController.logOut = async (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  });
  res.status(200).json({ status: 'success', message: '완료' });
};

userController.getUser = async (req, res) => {
  try {
    const user = User.findById(id);
  } catch (e) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};

module.exports = userController;
