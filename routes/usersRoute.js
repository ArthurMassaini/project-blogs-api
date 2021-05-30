const express = require('express');
const rescue = require('express-rescue');

const usersController = require('../controllers/usersController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post('/user', rescue(usersController.createUser));
router.get('/user', authMiddleware, rescue(usersController.getAllUsers));

module.exports = router;
