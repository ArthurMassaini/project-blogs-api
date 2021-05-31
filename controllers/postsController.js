require('dotenv').config();

const postsService = require('../services/postsService');

const { STATUS_CREATED, STATUS_BAD_REQUEST } = require('./statusResponses');

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { id: userId } = req.user;

  const result = await postsService.createPost(
    title,
    content,
    categoryIds,
    userId,
  );

  if (typeof result === 'string') {
    res.status(STATUS_BAD_REQUEST).json({ message: result });
  } else {
    res.status(STATUS_CREATED).json(result);
  }
};

module.exports = { createPost };
