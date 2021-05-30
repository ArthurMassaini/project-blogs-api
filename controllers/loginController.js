const loginService = require('../services/loginService');

const { STATUS_OK, STATUS_BAD_REQUEST } = require('./statusResponses');

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const result = await loginService.loginUser(email, password);

  if (typeof result === 'string') {
    res.status(STATUS_BAD_REQUEST).json({ message: result });
  } else {
    res.status(STATUS_OK).json({ token: result[0] });
  }
};

module.exports = { loginUser };
