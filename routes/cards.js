const express = require('express');

const cardRoutes = express.Router();
const { createCard, getCards, deleteCard } = require('../controllers/cards');

cardRoutes.post('/', express.json(), createCard);
cardRoutes.get('/', express.json(), getCards);
cardRoutes.delete('/:cardId', express.json(), deleteCard);

module.exports = { cardRoutes };
