const temp = 0;
const bcrypt = require('bcrypt');
const User = require('../../entitys/users/User.Schema');
const SECRET_CSRF_TOKEN = process.env.SECRET_CSRF_TOKEN;

const csrfCheck = async (req, res, next) => {
  try {
    if (req.method === 'GET' || req.method === 'OPTIONS' || req.method === 'HEAD') {
      return next();
    }

    const csrfToken = req.get('_csrf-token');

    if (!csrfToken) {
      throw new Error('잘못된 요청입니다.');
    }

    const valid = bcrypt.compareSync(SECRET_CSRF_TOKEN, csrfToken);

    if (!valid) throw new Error('잘못된 요청입니다.');
  } catch (e) {
    req.statusCode = 400;
    req.error = e.message;
  }
  next();
};

module.exports = csrfCheck;
