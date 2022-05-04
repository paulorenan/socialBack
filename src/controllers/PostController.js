const PostService = require('../services/PostService');
const auth = require('../schemas/authentication');

const createPost = async (req, res) => {
  const { userId } = auth.verifyToken(req.headers.authorization);
  const { content, image } = req.body;
  const post = await PostService.createPost({userId, content, image});
  if (post.error) {
    return res.status(400).json({
      error: post.error.errors[0].message
    });
  };
  return res.status(201).json(post);
};

const getPosts = async (req, res) => {
  const { limit } = req.query;
  const posts = await PostService.getPosts(limit);
  return res.status(200).json(posts);
};

const updatePost = async (req, res) => {
  const postId = req.params.id;
  const content = req.body.content;
  const newPost = await PostService.updatePost(postId, content);
  if (newPost.error) {
    return res.status(400).json({ error: newPost.error });
  };
  return res.status(200).json(newPost);
};

const deletePost = async (req, res) => {
  const postId = req.params.id;
  const deletedPost = await PostService.deletePost(postId);
  if (deletedPost.error) {
    return res.status(400).json({ error: deletedPost.error });
  };
  return res.status(200).json(deletedPost);
};

const getPostByUserId = async (req, res) => {
  const userId = req.params.id;
  const posts = await PostService.getPostByUserId(userId);
  return res.status(200).json(posts);
};

module.exports = {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  getPostByUserId,
};