const auth = require('../schemas/authentication');
const AnswerService = require('../services/AnswerService');

const verifyAnswerAndBelongsToUserEdit = async (req, res, next) => {
  const authToken = auth.verifyToken(req.headers.authorization);
  const id = req.params.id;
  const answer = await AnswerService.getAnswerById(id);
  if (!answer) {
    return res.status(404).json({ error: 'Answer not found' });
  };
  if (answer.userId !== authToken.userId) {
    return res.status(403).json({ error: 'You are not allowed to edit this answer' });
  };
  next();
};

const verifyAnswerAndBelongsToUserDelete = async (req, res, next) => {
  const authToken = auth.verifyToken(req.headers.authorization);
  const id = req.params.id;
  const answer = await AnswerService.getAnswerById(id);
  if (!answer) {
    return res.status(404).json({ error: 'Answer not found' });
  };
  if (answer.userId !== authToken.userId) {
    return res.status(403).json({ error: 'You are not allowed to delete this answer' });
  };
  next();
};

module.exports = {
  verifyAnswerAndBelongsToUserEdit,
  verifyAnswerAndBelongsToUserDelete,
};