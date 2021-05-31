const express = require('express');
const rescue = require('express-rescue');

const postsController = require('../controllers/postsController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post('/post', authMiddleware, rescue(postsController.createPost));
router.get('/post', authMiddleware, rescue(postsController.getAllPosts));
router.get('/post/:id', authMiddleware, rescue(postsController.getPostById));

module.exports = router;
