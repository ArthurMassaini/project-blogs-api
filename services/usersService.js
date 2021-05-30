const { User } = require('../models');

// ----------------------------------------- Validate functions

const verifyName = (name) => {
  if (name === undefined) {
    throw new Error('"displayName" is required');
  } else if (name.length < 8) {
    throw new Error('"displayName" length must be at least 8 characters long');
  }
};

const verifyPassword = (password) => {
  if (password === undefined) {
    throw new Error('"password" is required');
  } else if (password.length < 6) {
    throw new Error('"password" length must be 6 characters long');
  }
};

const verifyEmail = (email, allUsers) => {
  const regexEmail = new RegExp('.+@[A-z]+[.]com');

  const userAlreadyExists = allUsers.some((element) => element.email === email);

  if (email === undefined) {
    throw new Error('"email" is required');
  } else if (!regexEmail.test(email)) {
    throw new Error('"email" must be a valid email');
  } else if (userAlreadyExists) {
    throw new Error('User already registered');
  }
};

// ----------------------------------------- Service functions

const createUser = async (displayName, email, password, image) => {
  const allUsers = await User.findAll();

  try {
    verifyName(displayName);
    verifyPassword(password);
    verifyEmail(email, allUsers);

    const newUser = await User.create({ displayName, email, password, image });
    return newUser;
  } catch (error) {
    return error.message;
  }
};

const getAllUsers = async () => {
  const allUsers = await User.findAll();

  return allUsers;
};

const getUserById = async (id) => {
  const user = await User.findByPk(id);
  if (user === null) {
    return 'User does not exist';
  }
  return user;
};

module.exports = { createUser, getAllUsers, getUserById };
