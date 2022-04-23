const PostService = require('../services/PostService');
const auth = require('../schemas/authentication');

const createPost = async (req, res) => {
  const authToken = auth.verifyToken(req.headers.authorization);
  const newPost = {
    content: req.body.content,
    image: req.body.image,
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
  getAllPosts,
  updatePost,
  deletePost,
  getPostByUserId,
};