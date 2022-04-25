const UserService = require('../services/UserService');
const auth = require('../schemas/authentication');

const createUser = async (req, res) => {
  const { name, nickName, email, password } = req.body;
  const user = await UserService.createUser({ nickName, email, name, password });
  if (user.error) {
    return res.status(400).json({error: user.error.errors[0].message});
  };
  const token = auth.generateToken(user);
  res.status(201).json({ user, token });
};

const getUsers = async (req, res) => {
  const users = await UserService.getUsers();
  res.status(200).json(users);
}

const getUserByNickname = async (req, res) => {
  const { nickName } = req.params;
  const user = await UserService.getUserByNickname(nickName);
  if (!user) {
    return res.status(404).json({error: 'User not found'});
  }
  res.status(200).json(user);
};

const updateUser = async (req, res) => {
  const { userId } = auth.verifyToken(req.headers.authorization);
  const { name, nickName } = req.body;
  const user = await UserService.updateUser(userId, { name, nickName });
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.status(200).json(user);
};

const updateUserImage = async (req, res) => {
  const { userId } = auth.verifyToken(req.headers.authorization);
  const { image } = req.body;
  const user = await UserService.updateUserImage(userId, image);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.status(200).json(user);
};

const getUserById = async (req, res) => {
  const { userId } = req.params;
  const user = await UserService.getUserById(userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.status(200).json(user);
};

module.exports = {
  createUser,
  getUsers,
  getUserByNickname,
  updateUser,
  updateUserImage,
  getUserById,
};