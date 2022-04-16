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
  const userToken = req.headers.authorization;
  if (!userToken) {
    return res.status(401).json({ error: 'No token provided' });
  };
  const authToken = auth.verifyToken(userToken);
  if (!authToken) {
    return res.status(401).json({ error: 'Invalid token' });
  };
  const id = req.params.id;
  const answer = await AnswerService.getAnswerById(id);
  if (!answer) {
    return res.status(404).json({ error: 'Answer not found' });
  };
  if (answer.userId !== authToken.userId) {
    return res.status(403).json({ error: 'You are not allowed to edit this answer' });
  };
  const { content } = req.body;
  const updatedAnswer = await AnswerService.updateAnswer(id, content);
  return res.status(200).json(updatedAnswer);
};

const deleteAnswer = async (req, res) => {
  const userToken = req.headers.authorization;
  if (!userToken) {
    return res.status(401).json({ error: 'No token provided' });
  };
  const authToken = auth.verifyToken(userToken);
  if (!authToken) {
    return res.status(401).json({ error: 'Invalid token' });
  };
  const id = req.params.id;
  const answer = await AnswerService.getAnswerById(id);
  if (!answer) {
    return res.status(404).json({ error: 'Answer not found' });
  };
  if (answer.userId !== authToken.userId) {
    return res.status(403).json({ error: 'You are not allowed to delete this answer' });
  };
  const deletedAnswer = await AnswerService.deleteAnswer(id);
  return res.status(200).json(deletedAnswer);
};

module.exports = {
  createAnswer,
  getAllAnswers,
  getAnswersByPostId,
  countAnswersByPostId,
  updateAnswer,
  deleteAnswer,
};