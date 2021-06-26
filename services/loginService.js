const jwt = require('jsonwebtoken');
require('dotenv').config();

const { User } = require('../models');

// ----------------------------------------- Validate functions

const verifyEmail = (email) => {
  if (email === undefined) {
    throw new Error('"email" is required');
  } else if (email === '') {
    throw new Error('"email" is not allowed to be empty');
  }
};

const verifyPassword = (password, user) => {
  if (password === undefined) {
    throw new Error('"password" is required');
  } else if (password === '') {
    throw new Error('"password" is not allowed to be empty');
  } else if (user === null) {
    throw new Error('Invalid fields');
  }
};

// ----------------------------------------- Services functions

const loginUser = async (email, password) => {
  try {
    verifyEmail(email);
    const user = await User.findOne({ where: { email } });
    verifyPassword(password, user);

    const { JWT_SECRET } = process.env;
    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };

    const token = jwt.sign(
      { data: { email: user.email, displayName: user.displayName } },
      JWT_SECRET,
      jwtConfig,
    );
    return [token, user];
  } catch (error) {
    return error.message;
  }
};

module.exports = { loginUser };
