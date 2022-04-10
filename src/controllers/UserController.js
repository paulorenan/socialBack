const UserService = require('../services/UserService');
const auth = require('../schemas/authentication');
const validation = require('../schemas/validation');

const createUser = async (req, res) => {
  const newUser = req.body;
  const error = validation.validateUser(newUser);
  if (Object.keys(error).length > 0) {
    return res.status(400).json({ error });
  }
  const user = await UserService.createUser(newUser);
  if (user.error) {
    return res.status(400).json({error: user.error.errors[0].message});
  }
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