const express = require('express');
const { celebrate, Joi } = require('celebrate');

const userRoutes = express.Router();
const {
  getUsers, getUserById, updateUserInfo, updateUserAvatar, getUserMe,
} = require('../controllers/users');

userRoutes.get('/', express.json(), getUsers);
userRoutes.get(
  '/:id',
  express.json(),
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().length(24).hex(),
    }),
  }),

  getUserById,
);
userRoutes.get('/me', express.json(), getUserMe);
userRoutes.patch(
  '/me',
  express.json(),
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      about: Joi.string().min(2).max(30).required(),
    }),
  }),

  updateUserInfo,
);
userRoutes.patch(
  '/me/avatar',
  express.json(),
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string()
        .required()
        .pattern(/https?:\/\/(www\.)?[a-zA-Z\d\-.]{1,}\.[a-z]{1,6}([/a-z0-9\-._~:?#[\]@!$&'()*+,;=]*)/),
    }),
  }),

  updateUserAvatar,
);

module.exports = { userRoutes };
