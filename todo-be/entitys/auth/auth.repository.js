authController.authenticate = () => {
  try {
    const token = req.cookies['token'];
    if (!token) {
      throw new Error('invalid token');
    }
    jwt.verify(token, JWT_SECRET_KEY, (error, payload) => {
      if (error) throw new Error('invalid token');
    });
  } catch (e) {}
};
