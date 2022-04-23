const PostController = require('../controllers/PostController');
const TokenMiddleware = require('../middlewares/TokenMiddleware');
const PostMiddleware = require('../middlewares/PostMiddleware');
const { Router } = require('express')

const PostRoute = Router();

PostRoute.get('/', PostController.getAllPosts);

PostRoute.post('/', 
  TokenMiddleware.verifyToken,
  PostController.createPost,
);

PostRoute.get('/user/:id', PostController.getPostByUserId);

PostRoute.put('/:id',
  TokenMiddleware.verifyToken,
  PostMiddleware.verifyPostAndBelongsToUserUp,
  PostController.updatePost,
);

PostRoute.delete('/:id',
  TokenMiddleware.verifyToken,
  PostMiddleware.verifyPostAndBelongsToUserDel,
  PostController.deletePost);

module.exports = PostRoute;