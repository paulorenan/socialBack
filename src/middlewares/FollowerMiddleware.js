const verifyUserId = (req, res, next) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({
      error: 'No userId provided'
    });
  };
  next();
};

module.exports = {
  verifyUserId,
};