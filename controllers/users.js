const User = require('../models/user');

const createUser = async (req, res) => {
  const { name, about, avatar } = req.body;
  try {
    const user = await User.create({ name, about, avatar });
    res.status(200).send(user);
  } catch (err) {
    if (err.errors) {
      res.status(400).send({ message: 'Переданы некорректные данные' });
      return;
    }
    res.status(500).send({ message: 'Произошла ошибка на сервере' });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send({ message: 'Произошла ошибка на сервере' });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);

    if (!user) {
      res.status(404).send({ message: 'Пользователь не найден' });
      return;
    }
    res.status(200).send(user);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      res.status(400).send({ message: 'Невалидный ID пользователя' });
      return;
    }
    res.status(500).send({ message: 'Произошла ошибка на сервере' });
  }
};

const updateUserInfo = async (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  try {
    const user = await User.findByIdAndUpdate(userId, { name, about }, { new: true });
    if (!user) {
      res.status(404).send({ message: 'Пользователь не найден' });
      return;
    }
    res.status(200).send(user);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      res.status(400).send({ message: 'Невалидный ID пользователя' });
      return;
    }
    res.status(500).send({ message: 'Произошла ошибка на сервере' });
  }
};

const updateUserAvatar = async (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  try {
    const user = await User.findByIdAndUpdate(userId, { avatar }, { new: true });
    if (!user) {
      res.status(404).send({ message: 'Пользователь не найден' });
      return;
    }
    res.status(200).send(user);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      res.status(400).send({ message: 'Невалидный ID пользователя' });
      return;
    }
    res.status(500).send({ message: 'Произошла ошибка на сервере', ...err });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUserInfo,
  updateUserAvatar,
};
