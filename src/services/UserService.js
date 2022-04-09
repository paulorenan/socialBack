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
  return await User.findAll();
}

module.exports = {
  createUser,
  getUsers
};