const UserController = require('../controllers/UserController');
const { Router } = require('express')

const UserRouter = Router();
UserRouter.post('/', UserController.createUser);
UserRouter.get('/', UserController.getUsers);
UserRouter.put('/me', UserController.updateUser);
UserRouter.put('/me/image', UserController.updateUserImage);
UserRouter.get('/:nickName', UserController.getUserByNickname);

module.exports = UserRouter;

