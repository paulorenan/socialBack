const UserService = require('../services/UserService');

const createUser = async (req, res) => {
  const { nickName, email, name, password, image } = req.body;
  const user = await UserService.createUser({
    nickName,
    email,
    name,
    password,
    image
  });
  res.status(201).json(user);
}

const getUsers = async (req, res) => {
  const users = await UserService.getUsers();
  res.status(200).json(users);
}

module.exports = {
  createUser,
  getUsers
};