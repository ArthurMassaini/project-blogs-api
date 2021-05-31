const { PostsCategory } = require('../models');

const postsService = require('../services/postsService');

const {
  STATUS_CREATED,
  STATUS_BAD_REQUEST,
  STATUS_OK,
  STATUS_NOT_FOUND,
} = require('./statusResponses');

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
    categoryIds.forEach((categoryId) => {
      PostsCategory.create({ postId: result.id, categoryId });
    });

    res.status(STATUS_CREATED).json(result);
  }
};

const getAllPosts = async (req, res) => {
  const result = await postsService.getAllPosts();

  res.status(STATUS_OK).json(result);
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  const result = await postsService.getPostById(id);

  if (typeof result === 'string') {
    res.status(STATUS_NOT_FOUND).json({ message: result });
  } else {
    res.status(STATUS_OK).json(result);
  }
};

module.exports = { createPost, getAllPosts, getPostById };
