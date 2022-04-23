const UserService = require('../services/UserService');
const auth = require('../schemas/authentication');

const loadSession = async (req, res) => {
  const token = req.headers.authorization;
  const authToken = auth.verifyToken(token);
  const user = await UserService.getUserByEmail(authToken.email);
  if (!user) {
    return res.status(401).json({
      error: 'Invalid token'
    });
  }
  return res.status(200).json({
    user,
    token
  });
}

module.exports = {
  loadSession
};