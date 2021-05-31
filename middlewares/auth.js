const jwt = require('jsonwebtoken');
const { User } = require('../models');

const STATUS_UNAUTHORIZED = 401;

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;
  const { JWT_SECRET } = process.env;

  if (!token) {
    res.status(STATUS_UNAUTHORIZED).json({ message: 'Token not found' });
  } else {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await User.findOne({ where: { email: decoded.data.email } });
      req.user = user;

      next();
    } catch (error) {
      res
        .status(STATUS_UNAUTHORIZED)
        .json({ message: 'Expired or invalid token' });
    }
  }
};

module.exports = authMiddleware;
