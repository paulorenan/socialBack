const PostController = require('../controllers/PostController');
const { Router } = require('express')

const PostRoute = Router();

PostRoute.get('/', PostController.getAllPosts);
PostRoute.post('/', PostController.createPost);
PostRoute.get('/user/:id', PostController.getPostByUserId);
PostRoute.put('/:id', PostController.updatePost);
PostRoute.delete('/:id', PostController.deletePost);

module.exports = PostRoute;