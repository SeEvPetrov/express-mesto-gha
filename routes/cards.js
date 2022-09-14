const express = require('express');
const { celebrate, Joi } = require('celebrate');

const cardRoutes = express.Router();
const {
  createCard, getCards, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

cardRoutes.post(
  '/',
  express.json(),
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string()
        .required()
        .regex(/https?:\/\/(www)?[0-9a-z\-._~:/?#[\]@!$&'()*+,;=]+#?$/i),
    }),
  }),

  createCard,
);
cardRoutes.get('/', express.json(), getCards);
cardRoutes.delete(
  '/:cardId',
  express.json(),
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex(),
    }),
  }),

  deleteCard,
);
cardRoutes.put(
  '/:cardId/likes',
  express.json(),
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex(),
    }),
  }),

  likeCard,
);
cardRoutes.delete(
  '/:cardId/likes',
  express.json(),
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex(),
    }),
  }),

  dislikeCard,
);

module.exports = { cardRoutes };
