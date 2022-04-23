const auth = require('../schemas/authentication');

const verifyToken = async (req, res, next) => {
  const userToken = req.headers.authorization;
  if (!userToken) {
    return res.status(401).json({
      error: 'No token provided'
    });
  };
  const authToken = auth.verifyToken(userToken);
  if (!authToken) {
    return res.status(401).json({
      error: 'Invalid token'
    });
  };
  next();
};

module.exports = {
  verifyToken,
};