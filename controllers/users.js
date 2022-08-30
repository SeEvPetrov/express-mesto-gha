const User = require('../models/user');
const { BAD_REQ_ERROR, NOT_FOUND_ERROR, SERVER__ERROR } = require('../errors/errors');

const createUser = async (req, res) => {
  const { name, about, avatar } = req.body;
  try {
    const user = await User.create({ name, about, avatar });
    res.status(200).send(user);
  } catch (err) {
    if (err.errors) {
      res.status(BAD_REQ_ERROR).send({ message: 'Переданы некорректные данные' });
      return;
    }
    res.status(SERVER__ERROR).send({ message: 'Произошла ошибка на сервере' });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    res.status(SERVER__ERROR).send({ message: 'Произошла ошибка на сервере' });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);

    if (!user) {
      res.status(NOT_FOUND_ERROR).send({ message: 'Пользователь не найден' });
      return;
    }
    res.status(200).send(user);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      res.status(BAD_REQ_ERROR).send({ message: 'Невалидный ID пользователя' });
      return;
    }
    res.status(SERVER__ERROR).send({ message: 'Произошла ошибка на сервере' });
  }
};

const updateUserInfo = async (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { name, about },
      { new: true, runValidators: true },
    );
    if (!user) {
      res.status(NOT_FOUND_ERROR).send({ message: 'Пользователь не найден' });
      return;
    }
    res.status(200).send(user);
  } catch (err) {
    if (err.errors) {
      res.status(BAD_REQ_ERROR).send({ message: 'Переданы некорректные данные' });
      return;
    }
    res.status(SERVER__ERROR).send({ message: 'Произошла ошибка на сервере', ...err });
  }
};

const updateUserAvatar = async (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { avatar },
      { new: true, runValidators: true },
    );
    if (!user) {
      res.status(NOT_FOUND_ERROR).send({ message: 'Пользователь не найден' });
      return;
    }
    res.status(200).send(user);
  } catch (err) {
    if (err.errors) {
      res.status(BAD_REQ_ERROR).send({ message: 'Переданы некорректные данные' });
      return;
    }
    res.status(SERVER__ERROR).send({ message: 'Произошла ошибка на сервере' });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUserInfo,
  updateUserAvatar,
};
