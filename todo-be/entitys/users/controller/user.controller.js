const bcrypt = require('bcrypt');
const User = require('../User.Schema');
const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const userController = {};

userController.createUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      throw new Error('이미 가입이 된 유저입니다.');
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({ email, name, password: hash });

    await newUser.save();

    res.status(200).json({ status: 'success', data: newUser });
  } catch (e) {
    res.status(400).json({ status: 'success', error: e.message });
  }
};

userController.loginWithEmail = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log('1');
    console.log(user);
    if (user) {
      const isMath = bcrypt.compareSync(password, user.password);
      console.log('a');
      console.log(isMath);
      if (isMath) {
        const token = user.generateToken();
        console.log(token);
        console.log('b');
        const options = {
          httpOnly: true, // js로 cookie의 값을 읽어들일 수 없음
          sameSite: 'none', // 서버와 클라이언트가 동일한 도메인이 아니더라도 가능하게
          secure: true, // sameSite를 none으로 설정했을 때 설정
        };
        res.status(200).cookie('token', token, options).json({ status: 'success' }); // 일반 쿠키가 아닌 HTTP-ONLY Cookie 설정
      } else {
        res.status(400).json({ status: 'fail', message: 'invalid password' });
      }
    } else {
      res.status(400).json({ status: 'fail', message: 'user not found' });
    }
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

userController.validToken = async (req, res) => {
  const authHeader = req.get('Authrization');
  const token = req.cookies['token'];
  const result = jwt.verify(token, JWT_SECRET_KEY, (error, payload) => {
    if (error) {
      throw new Error('invalid token');
    }
  });
  res.status(200).json({ token: authHeader, a: req.cookies['token'], b: result });
};

module.exports = userController;
