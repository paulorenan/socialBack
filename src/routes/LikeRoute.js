const LikeController = require('../controllers/LikeController');
const TokenMiddleware = require('../middlewares/TokenMiddleware');
const LikeMiddleware = require('../middlewares/LikeMiddleware');
const { Router } = require('express');

const LikeRouter = Router();

LikeRouter.get('/user/count/:userId', LikeController.countUserLikes);

LikeRouter.get('/post/:postId', LikeController.getLikesByPostId);

LikeRouter.post('/',
  TokenMiddleware.verifyToken,
  LikeMiddleware.verifyPostId,
  LikeController.createLike,
);

LikeRouter.delete('/:postId',
  TokenMiddleware.verifyToken,
  LikeController.deleteLike,
);

module.exports = LikeRouter;