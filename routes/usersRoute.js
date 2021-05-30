const express = require('express');
const rescue = require('express-rescue');

const usersController = require('../controllers/usersController');
// const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/user', rescue(usersController.createUser));
// router.get('/users/:id', rescue(usersController.getUserById));

module.exports = router;
