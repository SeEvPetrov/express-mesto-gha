const Card = require('../models/cards');
const { BAD_REQ_ERROR, NOT_FOUND_ERROR, SERVER__ERROR } = require('../errors/errors');

const createCard = async (req, res) => {
  const { name, link } = req.body;
  try {
    const card = await Card.create({ name, link, owner: req.user._id });
    res.status(200).send(card);
  } catch (err) {
    if (err.errors) {
      res.status(BAD_REQ_ERROR).send({ message: 'Переданы некорректные данные' });
      return;
    }
    res.status(SERVER__ERROR).send({ message: 'Произошла ошибка на сервере' });
  }
};

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.status(200).send(cards);
  } catch (err) {
    res.status(SERVER__ERROR).send({ message: 'Произошла ошибка на сервере' });
  }
};

const deleteCard = async (req, res) => {
  const { cardId } = req.params;

  try {
    const card = await Card.findById(cardId);
    if (!card) {
      res.status(NOT_FOUND_ERROR).send({ message: 'Карточка не найдена' });
      return;
    }
    if (req.user._id !== card.owner.toString()) {
      console.log(req.user._id);
      console.log(card.owner);
      res.status(400).send('карточка не ваша');
      return;
    }
    card.remove();
    res.status(200).send({ message: 'Карточка удалена' });
  } catch (err) {
    if (err.kind === 'ObjectId') {
      res.status(BAD_REQ_ERROR).send({ message: 'Невалидный ID карточки' });
      return;
    }
    res.status(SERVER__ERROR).send({ message: 'Произошла ошибка на сервере' });
  }
};

const likeCard = async (req, res) => {
  const userId = req.user._id;
  const { cardId } = req.params;
  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: userId } },
      { new: true },
    );
    if (!card) {
      res.status(NOT_FOUND_ERROR).send({ message: 'Карточка не найдена' });
      return;
    }
    res.status(200).send(card);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      res.status(BAD_REQ_ERROR).send({ message: 'Невалидный ID карточки' });
      return;
    }
    res.status(SERVER__ERROR).send({ message: 'Произошла ошибка на сервере' });
  }
};

const dislikeCard = async (req, res) => {
  const userId = req.user._id;
  const { cardId } = req.params;
  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: userId } },
      { new: true },
    );
    if (!card) {
      res.status(NOT_FOUND_ERROR).send({ message: 'Карточка не найдена' });
      return;
    }
    res.status(200).send(card);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      res.status(BAD_REQ_ERROR).send({ message: 'Невалидный ID карточки' });
      return;
    }
    res.status(SERVER__ERROR).send({ message: 'Произошла ошибка на сервере' });
  }
};

module.exports = {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
};
