const express = require('express');

const cardRoutes = express.Router();
const {
  createCard, getCards, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

cardRoutes.post('/', express.json(), createCard);
cardRoutes.get('/', express.json(), getCards);
cardRoutes.delete('/:cardId', express.json(), deleteCard);
cardRoutes.put('/:cardId/likes', express.json(), likeCard);
cardRoutes.delete('/:cardId/likes', express.json(), dislikeCard);

module.exports = { cardRoutes };
