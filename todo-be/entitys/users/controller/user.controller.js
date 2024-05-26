const bcrypt = require('bcrypt');
const User = require('../User.Schema');

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

    newUser.save();

    res.statusCode = 200;
    res.data = newUser;

    res.status(200).json({ status: 'success', data: newUser });
  } catch (e) {
    res.status(400).json({ status: 'success', error: e.message });
  }
};

userController.loginWithEmail = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      const isMath = bcrypt.compareSync(password, user.password);
      if (isMath) {
        const token = user.generateToken();

        return res.status(200).json({ status: 'success', user, token });
      }
    }
  } catch (e) {}
};

module.exports = userController;
