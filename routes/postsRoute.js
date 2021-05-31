const express = require('express');
const rescue = require('express-rescue');

const postsController = require('../controllers/postsController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post('/post', authMiddleware, rescue(postsController.createPost));
// router.get('/user', authMiddleware, rescue(postsController.getAllUsers));
// router.get('/user/:id', authMiddleware, rescue(postsController.getUserById));

module.exports = router;
