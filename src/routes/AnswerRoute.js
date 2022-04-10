const AnswerController = require('../controllers/AnswerController');
const { Router } = require('express');

const AnswerRoute = Router();

AnswerRoute.get('/', AnswerController.getAllAnswers);
AnswerRoute.post('/', AnswerController.createAnswer);

module.exports = AnswerRoute;