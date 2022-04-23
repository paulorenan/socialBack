const { User } = require('../models');

const createUser = async (user) => {
  const { nickName, email, name, password } = user;
  try {
  return await User.create({
    nickName,
    email,
    name,
    password
  });
  } catch (error) {
    return { error }
  }
};

const getUsers = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] }
  });
  return users;
};

const getUserByEmail = async (email) => {
  const user = await User.findOne({
    where: {
      email
    },
    attributes: { exclude: ['password'] }
  });
  return user;
};

const userLogin = async (user) => {
  const { email, password } = user;
  const userData = await User.findOne({
    where: {
      email,
      password
    },
    attributes: { exclude: ['password'] }
  });
  return userData;
};

const getUserByNickname = async (nickName) => {
  const user = await User.findOne({
    where: {
      nickName
    },
    attributes: { exclude: ['password'] }
  });
  return user;
};

const updateUser = async (id, user) => {
  const { name, nickName } = user;
  try {
    return await User.update({
      name,
      nickName,
      updatedAt: new Date()
    }, {
      where: { id }
    });
  } catch (error) {
    return { error }
  }
};

const updateUserImage = async (id, image) => {
  try {
    return await User.update({
      image,
      updatedAt: new Date()
    }, {
      where: { id }
    });
  } catch (error) {
    return { error }
  }
};

const getUserById = async (id) => {
  const user = await User.findOne({
    where: {
      id
    },
    attributes: ['name', 'nickName', 'image']
  });
  return user;
};


module.exports = {
  createUser,
  getUsers,
  userLogin,
  getUserByEmail,
  getUserByNickname,
  updateUser,
  updateUserImage,
  getUserById,
};