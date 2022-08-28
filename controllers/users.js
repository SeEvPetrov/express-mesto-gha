const User = require('../models/user');

const createUser = async (req, res) => {
  try {
    const user = await new User(req.body).save();
    res.status(200).send(user);
  } catch (err) {
    if (err.errors.name.name === 'ValidatorError') {
      return res.status(400).send({ message: 'Не заполнены все нужные атрибуты' });
    }
    res.status(500).send({ message: 'Произошла ошибка на сервере', ...err });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send({ message: 'Произошла ошибка на сервере', ...err });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).send({ message: 'Такого пользователя не существует' });
    }
    res.send(user);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(400).send({ message: 'Невалидный ID пользователя' });
    }
    res.status(500).send({ message: 'Произошла ошибка на сервере', ...err });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
};
