const jwt = require('jsonwebtoken');
require('dotenv').config();

const usersService = require('../services/usersService');

const {
  STATUS_CONFLICT,
  STATUS_CREATED,
  STATUS_BAD_REQUEST,
  STATUS_OK,
  STATUS_NOT_FOUND,
} = require('./statusResponses');

// prettier-ignore
const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const result = await usersService.createUser(displayName, email, password, image);

  if (result === 'User already registered') {
    res.status(STATUS_CONFLICT).json({ message: result });
  } else if (typeof result === 'string') {
    res.status(STATUS_BAD_REQUEST).json({ message: result });
  } else {
    const { JWT_SECRET } = process.env;
    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };
    const token = jwt.sign({ data: { displayName, email } }, JWT_SECRET, jwtConfig);

    res
      .status(STATUS_CREATED)
      .json({ token });
  }
};

const getAllUsers = async (req, res) => {
  const result = await usersService.getAllUsers();

  res.status(STATUS_OK).json(result);
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  const result = await usersService.getUserById(id);

  if (typeof result === 'string') {
    res.status(STATUS_NOT_FOUND).json({ message: result });
  } else {
    res.status(STATUS_OK).json(result);
  }
};

module.exports = { createUser, getAllUsers, getUserById };
