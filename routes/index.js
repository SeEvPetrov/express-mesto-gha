const express = require('express');
const { celebrate, Joi } = require('celebrate');

const routes = express.Router();
const { userRoutes } = require('./users');
const { cardRoutes } = require('./cards');
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const { ErrorNotFound } = require('../errors/index');

routes.post(
  '/signup',
  express.json(),
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(
        /https?:\/\/(www\.)?[a-zA-Z\d\-.]{1,}\.[a-z]{1,6}([/a-z0-9\-._~:?#[\]@!$&'()*+,;=]*)/,
      ),
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

// routes.use(auth);

routes.use('/users', userRoutes);
routes.use('/cards', cardRoutes);

routes.use('*', express.json(), (req, res, next) => next(new ErrorNotFound('Такого запроса не существует')));

module.exports = { routes };
