const Card = require('../models/cards');

const createCard = async (req, res) => {
  const { name, link } = req.body;
  try {
    const card = await Card.create({ name, link, owner: req.user._id });
    res.status(200).send(card);
  } catch (err) {
    if (err.errors.link.name === 'ValidatorError') {
      res.status(400).send({ message: 'Не заполнены все нужные атрибуты' });
      return;
    }
    res.status(500).send({ message: 'Произошла ошибка на сервере', ...err });
  }
};

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.status(200).send(cards);
  } catch (err) {
    res.status(500).send({ message: 'Произошла ошибка на сервере' });
  }
};

const deleteCard = async (req, res) => {
  const { cardId } = req.params;

  try {
    const card = await Card.findById(cardId);
    if (!card) {
      res.status(404).send({ message: 'Карточка не найдена' });
      return;
    }
    card.remove();
    res.status(200).send('Карточка удалена');
  } catch (err) {
    res.status(500).send({ message: 'Произошла ошибка на сервере' });
  }
};

module.exports = {
  createCard,
  getCards,
  deleteCard,
};
