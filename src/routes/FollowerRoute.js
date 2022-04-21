const FollowerController = require('../controllers/FollowerController');
const { Router } = require('express');

const FollowerRouter = Router();
FollowerRouter.get('/count/:userId', FollowerController.countUserFollowers);
FollowerRouter.get('/following/count/:userId', FollowerController.countUserFollowings);
FollowerRouter.get('/:userId', FollowerController.getFollowersByUserId);
FollowerRouter.post('/', FollowerController.createFollower);
FollowerRouter.delete('/:userId', FollowerController.deleteFollower);

module.exports = FollowerRouter;