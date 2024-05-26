const intercepter = async (req, res) => {
  if (req.statusCode === 200 && req.token)
    res
      .status(200)
      .cookie('token', req.token, req.options)
      .json({ status: 'success', data: '로그인 성공' });
  else if (req.statusCode === 200) res.status(200).json({ status: 'success', data: req.data });
  else if (req.statusCode === 400) res.status(400).json({ status: 'fail', error: req.error });
};

module.exports = intercepter;
