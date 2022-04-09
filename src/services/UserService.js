const { User } = require('../models');

const createUser = async (user) => {
  const { nickName, email, name, password, image } = user;
  return await User.create({
    nickName,
    email,
    name,
    password,
    image
  });
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

module.exports = {
  createUser,
  getUsers,
  userLogin,
  getUserByEmail
};