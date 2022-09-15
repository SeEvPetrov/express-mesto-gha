const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../utils/config');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  if (!token) {
    res.status(401).send({ message: 'Авторизуйтесь' });
    return;
  }
  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    next(err);
  }

  req.user = payload;
  next();
};

module.exports = auth;
