const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../utils/config');
const { AuthorizationError } = require('../errors/index');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  if (!token) {
    next(new AuthorizationError('Авторизуйтесь'));
  }
  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    next(new AuthorizationError('Авторизуйтесь'));
  }

  req.user = payload;
  next();
};

module.exports = auth;
