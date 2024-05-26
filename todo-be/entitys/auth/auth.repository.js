const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
require('dotenv').config();

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
