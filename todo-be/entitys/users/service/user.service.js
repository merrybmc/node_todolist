const userService = {};
const bcrypt = require('bcrypt');
const User = require('../User.Schema');

userService.createUser = async (req, res, next) => {
  try {
    if (req.statusCode === 400) return next();

    const { email, name, password } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({ email, name, password: hash });

    newUser.save();

    req.statusCode = 200;
    req.data = newUser;
  } catch (e) {
    req.statusCode = 400;
    req.error = e.message;
  }
  next();
};

module.exports = userService;

userService.loginWithEmail = async (req, res, next) => {
  try {
    if (req.statusCode === 400) return next();

    const { user } = req;

    const token = user.generateToken();

    const options = {
      httpOnly: true, // js로 cookie의 값을 읽어들일 수 없음
      sameSite: 'none', // 서버와 클라이언트가 동일한 도메인이 아니더라도 가능하게
      secure: true, // sameSite를 none으로 설정했을 때 설정
    };

    req.statusCode = 200;
    req.token = token;
    req.options = options;
  } catch (e) {
    req.statusCode = 400;
    req.error = e.message;
  }
  next();
};
