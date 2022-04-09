const LoginController = require('../controllers/LoginController');
const { Router } = require('express');

const LoginRouter = Router();

LoginRouter.post('/', LoginController.login);

module.exports = LoginRouter;