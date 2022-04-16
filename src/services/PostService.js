const { Post, User, Answer, Like } = require('../models/');

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
      as: 'user',
      attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'email'] }
    },
    {
      model: Like,
      as: 'likes',
      attributes: ['userId']
    }],
    order: [['createdAt', 'DESC']]
  });
  return posts;
};

const getPostById = async (postId) => {
  const post = await Post.findOne({
    where: {
      id: postId
    },
  });
  return post;
};

const updatePost = async (postId, content) => {
  const post = await Post.update({
    content,
    updateAt: new Date()
  }, {
    where: {
      id: postId
    }
  });
  return post;
};

const deletePost = async (postId) => {
  const post = await Post.destroy({
    where: {
      id: postId
    }
  });
  return post;
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
}