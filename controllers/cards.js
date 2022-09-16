const Card = require('../models/cards');
const {
  ErrorNotFound, customError, ForbiddenError,
} = require('../errors/index');

const createCard = async (req, res, next) => {
  const { name, link } = req.body;
  try {
    const card = await Card.create({ name, link, owner: req.user._id });
    res.status(200).send(card);
  } catch (err) {
    customError(err, req, res, next);
  }
};

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    res.status(200).send(cards);
  } catch (err) {
    customError(err, req, res, next);
  }
};

const deleteCard = async (req, res, next) => {
  const { cardId } = req.params;

  try {
    const card = await Card.findById(cardId);
    if (!card) {
      throw new ErrorNotFound('Карточка не найдена');
    }
    if (req.user._id !== card.owner.toString()) {
      next(new ForbiddenError('Чужую карточку не удалить'));
      return;
    }
    await card.remove();
    res.status(200).send({ message: 'Карточка удалена' });
  } catch (err) {
    customError(err, req, res, next);
  }
};

const likeCard = async (req, res, next) => {
  const userId = req.user._id;
  const { cardId } = req.params;
  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: userId } },
      { new: true },
    );
    if (!card) {
      throw new ErrorNotFound('Карточка не найдена');
    }
    res.status(200).send(card);
  } catch (err) {
    customError(err, req, res, next);
  }
};

const dislikeCard = async (req, res, next) => {
  const userId = req.user._id;
  const { cardId } = req.params;
  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: userId } },
      { new: true },
    );
    if (!card) {
      throw new ErrorNotFound('Карточка не найдена');
    }
    res.status(200).send(card);
  } catch (err) {
    console.log(err);
    customError(err, req, res, next);
  }
};

module.exports = {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
};
