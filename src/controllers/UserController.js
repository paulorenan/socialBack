const UserService = require('../services/UserService');
const auth = require('../schemas/authentication');

const createUser = async (req, res) => {
  const { nickName, email, name, password, image } = req.body;
  const user = await UserService.createUser({
    nickName,
    email,
    name,
    password,
    image
  });
  const token = auth.generateToken(user);
  res.status(201).json({
    user,
    token
  });
}

const getUsers = async (req, res) => {
  const users = await UserService.getUsers();
  res.status(200).json(users);
}

module.exports = {
  createUser,
  getUsers
};