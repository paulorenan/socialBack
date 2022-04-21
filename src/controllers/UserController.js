const UserService = require('../services/UserService');
const auth = require('../schemas/authentication');
const validation = require('../schemas/validation');

const createUser = async (req, res) => {
  const { name, nickName, email, password } = req.body;
  const error = validation.validateUser({ nickName, email, name, password });
  if (Object.keys(error).length > 0) {
    return res.status(400).json({ error });
  }
  const user = await UserService.createUser({ nickName, email, name, password });
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

const getUserByNickname = async (req, res) => {
  const { nickName } = req.params;
  const user = await UserService.getUserByNickname(nickName);
  if (!user) {
    return res.status(404).json({error: 'User not found'});
  }
  res.status(200).json(user);
};

const updateUser = async (req, res) => {
  const userToken = req.headers.authorization;
  if (!userToken) {
    return res.status(401).json({ error: 'No token provided' });
  };
  const authToken = auth.verifyToken(userToken);
  if (!authToken) {
    return res.status(401).json({ error: 'Invalid token' });
  };
  const id = authToken.userId;
  const { name, nickName } = req.body;
  const error = validation.validateUpdateUser({ name, nickName });
  if (Object.keys(error).length > 0) {
    return res.status(400).json({ error });
  }
  const user = await UserService.updateUser(id, { name, nickName });
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.status(200).json(user);
};

const updateUserImage = async (req, res) => {
  const userToken = req.headers.authorization;
  if (!userToken) {
    return res.status(401).json({ error: 'No token provided' });
  };
  const authToken = auth.verifyToken(userToken);
  if (!authToken) {
    return res.status(401).json({ error: 'Invalid token' });
  };
  const id = authToken.userId;
  const { image } = req.body;
  const user = await UserService.updateUserImage(id, image);
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
};