require('dotenv').config();

const categoriesService = require('../services/categoriesService');

const { STATUS_CREATED, STATUS_BAD_REQUEST } = require('./statusResponses');

const createCategory = async (req, res) => {
  const { name } = req.body;

  const result = await categoriesService.createCategory(name);

  if (typeof result === 'string') {
    res.status(STATUS_BAD_REQUEST).json({ message: result });
  } else {
    res.status(STATUS_CREATED).json(result);
  }
};

module.exports = { createCategory };
