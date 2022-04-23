const LikeService = require('../services/LikeService');
const auth = require('../schemas/authentication');

const createLike = async (req, res) => {
  const authToken = auth.verifyToken(req.headers.authorization);
  const { postId } = req.body;
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
  const authToken = auth.verifyToken(req.headers.authorization);
  const { postId } = req.params;
  const like = await LikeService.deleteLike({
    postId,
    userId: authToken.userId
  });
  if (like.error) {
    return res.status(400).json({
      error: like.error.errors[0].message
    });
  }
  return res.status(200).json(like);
};

const countUserLikes = async (req, res) => {
  const { userId } = req.params;
  const count = await LikeService.countUserLikes(userId);
  return res.status(200).json(count);
};


module.exports = {
  createLike,
  deleteLike,
  countUserLikes,
};