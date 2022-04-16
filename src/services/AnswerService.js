const { Answer, User } = require('../models');

const createAnswer = async (answer) => {
  const { content, userId, postId } = answer;
  try {
    return await Answer.create({
      content,
      userId,
      postId
    });
  } catch (error) {
    return { error }
  };
};

const getAllAnswers = async () => {
  const answers = await Answer.findAll({
    include: [{
      model: User,
      attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'email'] }
    }],
    order: [['createdAt', 'DESC']]
  });
  return answers;
};

const getAnswersByPostId = async (postId) => {
  const answers = await Answer.findAll({
    where: {
      postId
    },
    include: [{
      model: User,
      as: 'user',
      attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'email'] }
    }],
    order: [['createdAt', 'ASC']]
  });
  return answers;
};

const countAnswersByPostId = async (postId) => {
  const count = await Answer.count({
    where: {
      postId
    }
  });
  return count;
};

module.exports = {
  createAnswer,
  getAllAnswers,
  getAnswersByPostId,
  countAnswersByPostId,
}
