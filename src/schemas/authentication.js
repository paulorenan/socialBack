const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.SECRET;

const jwtConfig = {
  expiresIn: '7d'
};

const generateToken = (user) => {
  const payload = {
    userId: user.id,
    email: user.email,
    nickName: user.nickName,
  };
  return jwt.sign(payload, secret, jwtConfig);
}

module.exports = {
  generateToken
}