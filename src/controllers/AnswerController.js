const AnswerService = require('../services/AnswerService');
const auth = require('../schemas/authentication');

const createAnswer = async (req, res) => {
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
  const newAnswer = {
    content: req.body.content,
    userId: authToken.userId,
    postId: req.body.postId
  };
  const answer = await AnswerService.createAnswer(newAnswer);
  if (answer.error) {
    return res.status(400).json({
      error: answer.error.errors[0].message
    });
  };
  return res.status(201).json(answer);
};

const getAllAnswers = async (req, res) => {
  const answers = await AnswerService.getAllAnswers();
  return res.status(200).json(answers);
};

module.exports = {
  createAnswer,
  getAllAnswers
};