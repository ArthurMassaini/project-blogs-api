const jwt = require('jsonwebtoken');
// const usersModel = require('../models/usersModel');

const STATUS_UNAUTHORIZED = 401;

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;
  const { JWT_SECRET } = process.env;

  if (!token) {
    res.status(STATUS_UNAUTHORIZED).json({ message: 'Token not found' });
  } else {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      console.log(decoded);
      // const user = await usersModel.getUserByEmail(decoded.data.email);
      // const { } = user;
      next();
    } catch (error) {
      res
        .status(STATUS_UNAUTHORIZED)
        .json({ message: 'Expired or invalid token' });
    }
  }
};

module.exports = authMiddleware;
