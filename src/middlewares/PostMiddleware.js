const auth = require('../schemas/authentication');
const PostService = require('../services/PostService');

const verifyPostAndBelongsToUserUp = async (req, res, next) => {
  const authToken = auth.verifyToken(req.headers.authorization);
  const postId = req.params.id;
  const post = await PostService.getPostById(postId);
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  };
  if (post.userId !== authToken.userId) {
    return res.status(403).json({ error: 'You are not allowed to edit this post' });
  };
  next();
};

const verifyPostAndBelongsToUserDel = async (req, res, next) => {
  const authToken = auth.verifyToken(req.headers.authorization);
  const postId = req.params.id;
  const post = await PostService.getPostById(postId);
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  };
  if (post.userId !== authToken.userId) {
    return res.status(403).json({ error: 'You are not allowed to delete this post' });
  };
  next();
};

module.exports = {
  verifyPostAndBelongsToUserUp,
  verifyPostAndBelongsToUserDel,
};