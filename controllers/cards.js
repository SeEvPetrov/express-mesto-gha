const Card = require('../models/cards');

const createCard = async (req, res) => {
  const { name, link } = req.body;
  try {
    const card = await Card.create({ name, link, owner: req.user._id });
    res.status(200).send(card);
  } catch (err) {
    if (err.errors.link.name === 'ValidatorError') {
      return res.status(400).send({ message: 'Не заполнены все нужные атрибуты' });
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
  try {
    await Card.findByIdAndRemove(req.params.cardId);
    res.status(200).send('Карточка удалена');
  } catch (err) {
    res.status(500).send({ message: 'Произошла ошибка на сервере', ...err });
  }
};

module.exports = {
  createCard,
  getCards,
  deleteCard,
};
