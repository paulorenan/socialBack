const { Post, User, Answer } = require('../models/');

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
  const postsWithAnswers = await Promise.all(posts.map(async (post) => {
    const answers = await Answer.count({
      where: {
        postId: post.id
      }
    });
    return {
      ...post.dataValues,
      answers
    };
  }));
  return postsWithAnswers;
};

module.exports = {
  createPost,
  getAllPosts
}