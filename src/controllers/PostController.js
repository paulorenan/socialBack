const PostService = require('../services/PostService');
const auth = require('../schemas/authentication');

const createPost = async (req, res) => {
  const userToken = req.headers.authorization;
  if (!userToken) {
    return res.status(401).json({
      error: 'No token provided'
    });
  };
  const authToken = auth.verifyToken(userToken);
  if (!authToken) {
    return res.status(401).json({
      error: 'Invalid token'
    });
  };
  const newPost = {
    content: req.body.content,
    userId: authToken.userId
  };
  const post = await PostService.createPost(newPost);
  if (post.error) {
    return res.status(400).json({
      error: post.error.errors[0].message
    });
  };
  return res.status(201).json(post);
};

const getAllPosts = async (req, res) => {
  const posts = await PostService.getAllPosts();
  return res.status(200).json(posts);
};

const updatePost = async (req, res) => {
  const userToken = req.headers.authorization;
  if (!userToken) {
    return res.status(401).json({ error: 'No token provided' });
  };
  const authToken = auth.verifyToken(userToken);
  if (!authToken) {
    return res.status(401).json({ error: 'Invalid token' });
  };
  const postId = req.params.id;
  const post = await PostService.getPostById(postId);
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  };
  if (post.userId !== authToken.userId) {
    return res.status(403).json({ error: 'You are not allowed to edit this post' });
  };
  const content = req.body.content;
  const newPost = await PostService.updatePost(postId, content);
  if (post.error) {
    return res.status(400).json({ error: post.error });
  };
  return res.status(200).json(newPost);
};

const deletePost = async (req, res) => {
  const userToken = req.headers.authorization;
  if (!userToken) {
    return res.status(401).json({ error: 'No token provided' });
  };
  const authToken = auth.verifyToken(userToken);
  if (!authToken) {
    return res.status(401).json({ error: 'Invalid token' });
  };
  const postId = req.params.id;
  const post = await PostService.getPostById(postId);
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  };
  if (post.userId !== authToken.userId) {
    return res.status(403).json({ error: 'You are not allowed to delete this post' });
  };
  const deletedPost = await PostService.deletePost(postId);
  if (post.error) {
    return res.status(400).json({ error: post.error });
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
  getAllPosts,
  updatePost,
  deletePost,
  getPostByUserId,
};