const AnswerController = require('../controllers/AnswerController');
const { Router } = require('express');

const AnswerRoute = Router();

AnswerRoute.get('/', AnswerController.getAllAnswers);
AnswerRoute.post('/', AnswerController.createAnswer);
AnswerRoute.get('/count/:postId', AnswerController.countAnswersByPostId);
AnswerRoute.get('/:postId', AnswerController.getAnswersByPostId);
AnswerRoute.put('/:id', AnswerController.updateAnswer);
AnswerRoute.delete('/:id', AnswerController.deleteAnswer);

module.exports = AnswerRoute;