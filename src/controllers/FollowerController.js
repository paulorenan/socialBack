const FollowerService = require('../services/FollowerService');
const auth = require('../schemas/authentication');

const createFollower = async (req, res) => {
  const userToken = req.headers.authorization;
  if (!userToken) {
    return res.status(401).json({
      error: 'No token provided'
    });
  };
  const authToken = auth.verifyToken(userToken);
  if (!authToken) {
    return res.status(401).json({
      error: 'Invalid token'
    });
  };
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({
      error: 'No userId provided'
    });
  };
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
  const userToken = req.headers.authorization;
  if (!userToken) {
    return res.status(401).json({
      error: 'No token provided'
    });
  };
  const authToken = auth.verifyToken(userToken);
  if (!authToken) {
    return res.status(401).json({
      error: 'Invalid token'
    });
  };
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).json({
      error: 'No userId provided'
    });
  };
  const follower = await FollowerService.deleteFollower({
    userId,
    followerId: authToken.userId,
  });
  if (follower.error) {
    return res.status(400).json({
      error: 'You did not follow this user'
    });
  }
  return res.status(201).json(follower);
};

const countUserFollowers = async (req, res) => {
  const userId = req.params.userId;
  if (!userId) {
    return res.status(400).json({
      error: 'No userId provided'
    });
  };
  const count = await FollowerService.countUserFollowers(userId);
  return res.status(201).json(count);
};

const countUserFollowings = async (req, res) => {
  const userId = req.params.userId;
  if (!userId) {
    return res.status(400).json({
      error: 'No userId provided'
    });
  };
  const count = await FollowerService.countUserFollowings(userId);
  return res.status(201).json(count);
};

const getFollowersByUserId = async (req, res) => {
  const userId = req.params.userId;
  if (!userId) {
    return res.status(400).json({
      error: 'No userId provided'
    });
  };
  const followers = await FollowerService.getFollowersByUserId(userId);
  return res.status(201).json(followers);
};

module.exports = {
  createFollower,
  deleteFollower,
  countUserFollowers,
  countUserFollowings,
  getFollowersByUserId,
};