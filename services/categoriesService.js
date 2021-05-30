const { Category } = require('../models');

// ----------------------------------------- Validate functions

const verifyName = (name) => {
  if (name === undefined) {
    throw new Error('"name" is required');
  }
};

// ----------------------------------------- Service functions

const createCategory = async (name) => {
  try {
    verifyName(name);

    const newCategory = await Category.create({ name });
    return newCategory;
  } catch (error) {
    return error.message;
  }
};

module.exports = { createCategory };
