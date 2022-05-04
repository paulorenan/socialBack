const { Like } = require('../models');

const createLike = async (like) => {
  const { postId, userId } = like;
  try {
    return await Like.create({
      postId,
      userId
    });
  } catch (error) {
    return { error };
  };
};

const deleteLike = async (like) => {
  const { postId, userId } = like;
  try {
    return await Like.destroy({
      where: {
        postId,
        userId
      }
    });
  } catch (error) {
    return { error };
  };
};

const countUserLikes = async (userId) => {
  const count = await Like.count({
    where: {
      userId
    }
  });
  return count;
};

const getLikesByPostId = async (postId) => {
  const likes = await Like.findAll({
    where: {
      postId
    },
    attributes: ['userId']
  });
  return likes;
}

module.exports = {
  createLike,
  deleteLike,
  countUserLikes,
  getLikesByPostId,
}