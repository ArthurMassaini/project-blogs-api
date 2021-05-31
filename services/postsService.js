const { BlogPost, Category, User } = require('../models');

// ----------------------------------------- Validate functions

const verifyTitle = (title) => {
  if (title === undefined) {
    throw new Error('"title" is required');
  }
};

const verifyContent = (content) => {
  if (content === undefined) {
    throw new Error('"content" is required');
  }
};

const verifyCategoryId = (categoryIds) => {
  if (categoryIds === undefined) {
    throw new Error('"categoryIds" is required');
  }
};

const verifyCategoryIdExists = (categoryIds, allCategories) => {
  let categoryExist;

  const idAllCategories = allCategories.map((element) => element.id);

  categoryIds.forEach((id) => {
    categoryExist = idAllCategories.includes(id);
  });

  if (!categoryExist) {
    throw new Error('"categoryIds" not found');
  }
};

const verifyUser = (post, userId) => {
  if (post.userId !== userId) {
    throw new Error('Unauthorized user');
  }
};

// ----------------------------------------- Service functions

const createPost = async (title, content, categoryIds, userId) => {
  const allCategories = await Category.findAll();

  try {
    verifyTitle(title);
    verifyContent(content);
    verifyCategoryId(categoryIds);
    verifyCategoryIdExists(categoryIds, allCategories);

    const newPost = await BlogPost.create({ title, content, userId });
    return { id: newPost.id, userId, title, content };
  } catch (error) {
    return error.message;
  }
};

const getAllPosts = async () => {
  const allPosts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user' },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return allPosts;
};

const getPostById = async (id) => {
  const post = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user' },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  if (post === null) {
    return 'Post does not exist';
  }
  return post;
};

const updatePost = async (id, title, content, userId) => {
  const post = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user' },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  try {
    verifyTitle(title);
    verifyContent(content);
    verifyUser(post, userId);

    await BlogPost.update({ title, content }, { where: { id } });

    return { title, content, userId, categories: post.categories };
  } catch (error) {
    return error.message;
  }
};

module.exports = { createPost, getAllPosts, getPostById, updatePost };
