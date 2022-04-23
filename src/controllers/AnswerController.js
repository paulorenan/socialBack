const AnswerService = require('../services/AnswerService');
const auth = require('../schemas/authentication');

const createAnswer = async (req, res) => {
  const authToken = auth.verifyToken(req.headers.authorization);
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

const getAnswersByPostId = async (req, res) => {
  const answers = await AnswerService.getAnswersByPostId(req.params.postId);
  return res.status(200).json(answers);
};

const countAnswersByPostId = async (req, res) => {
  const postId = req.params.postId;
  const count = await AnswerService.countAnswersByPostId(postId);
  return res.status(200).json(count);
};

const updateAnswer = async (req, res) => {
  const id = req.params.id;
  const { content } = req.body;
  const updatedAnswer = await AnswerService.updateAnswer(id, content);
  return res.status(200).json(updatedAnswer);
};

const deleteAnswer = async (req, res) => {
  const id = req.params.id;
  const deletedAnswer = await AnswerService.deleteAnswer(id);
  return res.status(200).json(deletedAnswer);
};

const countUserAnswers = async (req, res) => {
  const { userId } = req.params;
  const count = await AnswerService.countUserAnswers(userId);
  return res.status(200).json(count);
};

module.exports = {
  createAnswer,
  getAllAnswers,
  getAnswersByPostId,
  countAnswersByPostId,
  updateAnswer,
  deleteAnswer,
  countUserAnswers,
};