const UserController = require('../controllers/UserController');
const { Router } = require('express')

const UserRouter = Router();

UserRouter.post('/', UserController.createUser);
UserRouter.get('/', UserController.getUsers);

module.exports = UserRouter;

