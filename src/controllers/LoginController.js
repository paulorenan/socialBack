const UserService = require('../services/UserService');
const auth = require('../schemas/authentication');

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserService.userLogin({
    email,
    password
  });
  if (!user) {
    res.status(401).json({
      message: 'Invalid email or password'
    });
  } else {
    const token = auth.generateToken(user);
    res.status(200).json({
      user,
      token
    });
  }
};

module.exports = {
  login
};