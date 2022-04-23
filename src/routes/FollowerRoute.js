const FollowerController = require('../controllers/FollowerController');
const TokenMiddleware = require('../middlewares/TokenMiddleware');
const FollowerMiddleware = require('../middlewares/FollowerMiddleware');
const { Router } = require('express');

const FollowerRouter = Router();
FollowerRouter.get('/count/:userId', FollowerController.countUserFollowers);

FollowerRouter.get('/following/count/:userId', FollowerController.countUserFollowings);

FollowerRouter.get('/:userId', FollowerController.getFollowersByUserId);

FollowerRouter.post('/',
  TokenMiddleware.verifyToken,
  FollowerMiddleware.verifyUserId,
  FollowerController.createFollower,
);

FollowerRouter.delete('/:userId', 
  TokenMiddleware.verifyToken,
  FollowerController.deleteFollower,
);

module.exports = FollowerRouter;