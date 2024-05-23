const intercepter = async (req, res) => {
  req.statusCode === 200 && res.status(200).json({ status: 'success', data: req.data });
  req.statusCode === 400 && res.status(400).json({ status: 'fail', error: req.error });
};

module.exports = intercepter;
