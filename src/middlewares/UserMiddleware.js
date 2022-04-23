const validation = require('../schemas/validation');

const validateUser = (req, res, next) => {
  const { name, nickName, email, password } = req.body;
  const error = validation.validateUser({ nickName, email, name, password });
  if (Object.keys(error).length > 0) {
    return res.status(400).json({ error });
  };
  next();
};

const validateUpdateUser = (req, res, next) => {
  const { name, nickName } = req.body;
  const error = validation.validateUpdateUser({ name, nickName });
  if (Object.keys(error).length > 0) {
    return res.status(400).json({ error });
  };
  next();
};

module.exports = {
  validateUser,
  validateUpdateUser,
};