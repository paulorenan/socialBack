const LoadSessionController = require('../controllers/LoadSessionController');
const { Router } = require('express');

const LoadRouter = Router();

LoadRouter.post('/', LoadSessionController.loadSession);

module.exports = LoadRouter;