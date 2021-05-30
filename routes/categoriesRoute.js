const express = require('express');
const rescue = require('express-rescue');

const categoriesController = require('../controllers/categoriesController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post(
  '/categories',
  authMiddleware,
  rescue(categoriesController.createCategory),
);
// router.get('/user', authMiddleware, rescue(categoriesController.getAllUsers));
// router.get('/user/:id', authMiddleware, rescue(categoriesController.getUserById));

module.exports = router;
