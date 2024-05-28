const User = require('../users/User.Schema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const SECRET_CSRF_TOKEN = process.env.SECRET_CSRF_TOKEN;
require('dotenv').config();

const authController = {};

// 이메일 유효성 검사
authController.validEmail = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
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

// 토큰 검증
authController.authenticate = async (req, res, next) => {
  try {
    // const authHeader = req.get('Authrization');

    const token = req.cookies['token'];
    let result = '';

    if (!token) throw new Error('토큰이 유효하지 않습니다.');

    jwt.verify(token, JWT_SECRET_KEY, (error, payload) => {
      if (error) {
        throw new Error('토큰이 유효하지 않습니다.');
      } else {
        result = payload._id;
      }
    });
    req.validTokenId = result;
    req.statusCode = 200;
  } catch (e) {
    req.statusCode = 400;
    req.error = e.message;
  }
  next();
};

// 로그아웃 (httpOnly Cookie 삭제)
authController.logout = async (req, res, next) => {
  try {
    const token = req.cookies['token'];

    if (!token) throw new Error('로그인 상태가 아닙니다.');

    res.clearCookie('token', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });

    res.status(200).json({ status: 'success' });
  } catch (e) {
    res.status(400).json({ status: 'fail', error: e.message });
  }
};

// CSRF 토큰 생성
authController.createCsrfToken = (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(SECRET_CSRF_TOKEN, salt);

    const options = {
      httpOnly: true, // js로 cookie의 값을 읽어들일 수 없음
      sameSite: 'none', // 서버와 클라이언트가 동일한 도메인이 아니더라도 가능하게
      secure: true, // sameSite를 none으로 설정했을 때 설정
    };

    res.cookie('csrfToken', hash, options);
    res.status(200).json({ status: 'success' });
  } catch (e) {
    res.status(400).json({ status: 'fail', error: e });
  }
};

module.exports = authController;
