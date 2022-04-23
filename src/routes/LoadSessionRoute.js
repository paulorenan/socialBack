const LoadSessionController = require('../controllers/LoadSessionController');
const TokenMiddleware = require('../middlewares/TokenMiddleware');
const { Router } = require('express');

const LoadRouter = Router();

LoadRouter.post('/',
  TokenMiddleware.verifyToken,
  LoadSessionController.loadSession,
);

module.exports = LoadRouter;