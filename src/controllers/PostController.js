const PostService = require('../services/PostService');
const auth = require('../schemas/authentication');

const createPost = async (req, res) => {
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
  const newPost = {
    content: req.body.content,
    userId: authToken.userId
  };
  const post = await PostService.createPost(newPost);
  if (post.error) {
    return res.status(400).json({
      error: post.error.errors[0].message
    });
  }
  return res.status(201).json(post);
}

const getAllPosts = async (req, res) => {
  const posts = await PostService.getAllPosts();
  return res.status(200).json(posts);
}

module.exports = {
  createPost,
  getAllPosts
};