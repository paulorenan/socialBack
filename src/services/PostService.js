const { Post, User, Answer, Like } = require('../models/');

const createPost = async (post) => {
  const { content, image, userId } = post;
  try {
    return await Post.create({
      content,
      userId,
      image
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

const getPostByUserId = async (userId) => {
  const posts = await Post.findAll({
    where: {
      userId
    },
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
  getPostByUserId,
}