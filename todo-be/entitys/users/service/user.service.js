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
