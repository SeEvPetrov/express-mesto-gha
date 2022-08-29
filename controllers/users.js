const User = require('../models/user');

const createUser = async (req, res) => {
  const { name, about, avatar } = req.body;
  try {
    const user = await User.create({ name, about, avatar });
    res.status(200).send(user);
  } catch (err) {
    if (err.errors.name.name === 'ValidatorError') {
      res.status(400).send({ message: 'Не заполнены все нужные атрибуты' });
      return;
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

const updateUser = async (req, res) => {
  // const { name, about } = req.body;
  try {
    const updat = await User.findByIdAndUpdate(req.user._id, {
      'name': name,
      'about': about,
    });
    res.status(200).send(updat);
  } catch (err) {
    res.status(500).send({ message: 'Произошла ошибка на сервере', ...err });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
};
