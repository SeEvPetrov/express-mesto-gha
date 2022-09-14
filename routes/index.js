const express = require('express');
const { celebrate, Joi } = require('celebrate');

const routes = express.Router();
const { userRoutes } = require('./users');
const { cardRoutes } = require('./cards');
const { login, createUser } = require('../controllers/users');
const { BadRequestError } = require('../errors/index');
const auth = require('../middlewares/auth');

routes.post(
  '/signup',
  express.json(),
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().regex(/https?:\/\/(www)?[0-9a-z\-._~:/?#[\]@!$&'()*+,;=]+#?$/i),
    }),
  }),

  createUser,
);

routes.post(
  '/signin',
  express.json(),
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),

  login,
);

routes.use(auth);

routes.use('/users', userRoutes);
routes.use('/cards', cardRoutes);

routes.use('*', (req, res, next) => next(new BadRequestError('Такого запроса не существует')));

module.exports = { routes };
