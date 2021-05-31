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

module.exports = { createPost, getAllPosts, getPostById };
