const UserController = require('../controllers/UserController');
const UserMiddleware = require('../middlewares/UserMiddleware');
const TokenMiddleware = require('../middlewares/TokenMiddleware');
const { Router } = require('express')

const UserRouter = Router();
UserRouter.post('/',
  UserMiddleware.validateUser,
  UserController.createUser,
);

UserRouter.get('/', UserController.getUsers);

UserRouter.put('/me',
  TokenMiddleware.verifyToken,
  UserMiddleware.validateUpdateUser,
  UserController.updateUser,
);

UserRouter.put('/me/image',
  TokenMiddleware.verifyToken,
  UserController.updateUserImage);

UserRouter.get('/:nickName', UserController.getUserByNickname);

module.exports = UserRouter;

