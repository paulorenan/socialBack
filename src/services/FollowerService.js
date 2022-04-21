const { Follower } = require('../models');

const createFollower = async (follower) => {
  const { userId, followerId } = follower;
  try {
    return await Follower.create({
      userId,
      followerId
    });
  } catch (error) {
    return { error };
  };
}

const deleteFollower = async (follower) => {
  const { userId, followerId } = follower;
  try {
    return await Follower.destroy({
      where: {
        userId,
        followerId
      }
    });
  } catch (error) {
    return { error };
  };
}

const countUserFollowers = async (userId) => {
  const count = await Follower.count({
    where: {
      userId
    }
  });
  return count;
}

const countUserFollowings = async (userId) => {
  const count = await Follower.count({
    where: {
      followerId: userId
    }
  });
  return count;
};

const getFollowersByUserId = async (userId) => {
  const followers = await Follower.findAll({
    where: {
      userId
    },
    attributes: ['followerId']
  });
  return followers;
};

module.exports = {
  createFollower,
  deleteFollower,
  countUserFollowers,
  countUserFollowings,
  getFollowersByUserId,
};