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

module.exports = {
  createAnswer,
  getAllAnswers
}
