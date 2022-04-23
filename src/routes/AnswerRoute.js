const AnswerController = require('../controllers/AnswerController');
const TokenMiddleware = require('../middlewares/TokenMiddleware');
const AnswerMiddleware = require('../middlewares/AnswerMiddleware');
const { Router } = require('express');

const AnswerRoute = Router();

AnswerRoute.get('/', AnswerController.getAllAnswers);

AnswerRoute.post('/', 
  TokenMiddleware.verifyToken,
  AnswerController.createAnswer,
);

AnswerRoute.get('/count/:postId', AnswerController.countAnswersByPostId);

AnswerRoute.get('/user/count/:userId', AnswerController.countUserAnswers);

AnswerRoute.get('/:postId', AnswerController.getAnswersByPostId);

AnswerRoute.put('/:id',
  TokenMiddleware.verifyToken,
  AnswerMiddleware.verifyAnswerAndBelongsToUserEdit,
  AnswerController.updateAnswer,
);

AnswerRoute.delete('/:id',
  TokenMiddleware.verifyToken,
  AnswerMiddleware.verifyAnswerAndBelongsToUserDelete,
  AnswerController.deleteAnswer,
);

module.exports = AnswerRoute;