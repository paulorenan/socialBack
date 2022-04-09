const { Post, User } = require('../models/');

const createPost = async (post) => {
  const { content, userId } = post;
  try {
    return await Post.create({
      content,
      userId
    });
  } catch (error) {
    return { error }
  };
};

const getAllPosts = async () => {
  const posts = await Post.findAll({
    include: [{
      model: User,
      attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'email'] }
    }],
    order: [['createdAt', 'DESC']]
  });
  return posts;
};

module.exports = {
  createPost,
  getAllPosts
}