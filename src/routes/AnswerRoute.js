const AnswerController = require('../controllers/AnswerController');
const { Router } = require('express');

const AnswerRoute = Router();

AnswerRoute.get('/', AnswerController.getAllAnswers);
AnswerRoute.post('/', AnswerController.createAnswer);
AnswerRoute.get('/:postId', AnswerController.getAnswersByPostId);

module.exports = AnswerRoute;