const FollowerService = require('../services/FollowerService');
const auth = require('../schemas/authentication');

const createFollower = async (req, res) => {
  const authToken = auth.verifyToken(req.headers.authorization);
  const { userId } = req.body;
  const newFollower = {
    userId,
    followerId: authToken.userId,
  };
  const follower = await FollowerService.createFollower(newFollower);
  if (follower.error) {
    return res.status(400).json({
      error: 'You already followed this user'
    });
  };
  return res.status(201).json(follower);
};

const deleteFollower = async (req, res) => {
  const authToken = auth.verifyToken(req.headers.authorization);
  const { userId } = req.params;
  const follower = await FollowerService.deleteFollower({
    userId,
    followerId: authToken.userId,
  });
  if (follower.error) {
    return res.status(400).json({
      error: 'You did not follow this user'
    });
  }
  return res.status(200).json(follower);
};

const countUserFollowers = async (req, res) => {
  const userId = req.params.userId;
  const count = await FollowerService.countUserFollowers(userId);
  return res.status(200).json(count);
};

const countUserFollowings = async (req, res) => {
  const userId = req.params.userId;
  const count = await FollowerService.countUserFollowings(userId);
  return res.status(200).json(count);
};

const getFollowersByUserId = async (req, res) => {
  const userId = req.params.userId;
  const followers = await FollowerService.getFollowersByUserId(userId);
  return res.status(200).json(followers);
};

module.exports = {
  createFollower,
  deleteFollower,
  countUserFollowers,
  countUserFollowings,
  getFollowersByUserId,
};