const express = require('express');
const rescue = require('express-rescue');

const postsController = require('../controllers/postsController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post('/post', authMiddleware, rescue(postsController.createPost));
router.get('/post', authMiddleware, rescue(postsController.getAllPosts));
router.get('/post/search', authMiddleware, rescue(postsController.getPostByTerm));
router.get('/post/:id', authMiddleware, rescue(postsController.getPostById));
router.put('/post/:id', authMiddleware, rescue(postsController.updatePost));
router.delete('/post/:id', authMiddleware, rescue(postsController.deletePost));

module.exports = router;
