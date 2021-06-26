const express = require('express');
const rescue = require('express-rescue');

const usersController = require('../controllers/usersController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post('/user', rescue(usersController.createUser));
router.get('/user', authMiddleware, rescue(usersController.getAllUsers));
router.get('/user/:id', authMiddleware, rescue(usersController.getUserById));
router.delete('/user/me', authMiddleware, rescue(usersController.deleteUser));

module.exports = router;
