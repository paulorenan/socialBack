const verifyPostId = (req, res, next) => {
  const { postId } = req.body;
  if (!postId) {
    return res.status(400).json({
      error: 'No postId provided'
    });
  };
  next();
};

module.exports = {
  verifyPostId,
};