const LikeService = require('../services/LikeService');
const auth = require('../schemas/authentication');

const createLike = async (req, res) => {
  const userToken = req.headers.authorization;
  if (!userToken) {
    return res.status(401).json({
      error: 'No token provided'
    });
  }
  const authToken = auth.verifyToken(userToken);
  if (!authToken) {
    return res.status(401).json({
      error: 'Invalid token'
    });
  }
  const { postId } = req.body;
  if (!postId) {
    return res.status(400).json({
      error: 'No postId provided'
    });
  }
  const newLike = {
    postId,
    userId: authToken.userId
  };
  const like = await LikeService.createLike(newLike);
  if (like.error) {
    return res.status(400).json({
      error: 'You already liked this post'
    });
  }
  return res.status(201).json(like);
};

const deleteLike = async (req, res) => {
  const userToken = req.headers.authorization;
  if (!userToken) {
    return res.status(401).json({
      error: 'No token provided'
    });
  }
  const authToken = auth.verifyToken(userToken);
  if (!authToken) {
    return res.status(401).json({
      error: 'Invalid token'
    });
  }
  const { postId } = req.params;
  console.log(req.params);
  if (!postId) {
    return res.status(400).json({
      error: 'No postId provided'
    });
  }
  const like = await LikeService.deleteLike({
    postId,
    userId: authToken.userId
  });
  if (like.error) {
    return res.status(400).json({
      error: like.error.errors[0].message
    });
  }
  return res.status(201).json(like);
};

module.exports = {
  createLike,
  deleteLike
};