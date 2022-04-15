const LikeController = require('../controllers/LikeController');
const { Router } = require('express');

const LikeRouter = Router();
LikeRouter.post('/', LikeController.createLike);
LikeRouter.delete('/:postId', LikeController.deleteLike);

module.exports = LikeRouter;