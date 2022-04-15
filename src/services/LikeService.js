const { Like } = require('../models');

const createLike = async (like) => {
  const { postId, userId } = like;
  try {
    return await Like.create({
      postId,
      userId
    });
  } catch (error) {
    return { error }
  }
}

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
    return { error }
  }
}

module.exports = {
  createLike,
  deleteLike
}