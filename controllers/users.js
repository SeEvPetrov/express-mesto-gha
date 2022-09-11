const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  BAD_REQ_ERROR,
  NOT_FOUND_ERROR,
  SERVER__ERROR,
} = require('../errors/errors');

const createUser = async (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  const foundedUser = await User.findOne({ email });
  if (foundedUser) {
    res.status(403).send({ message: 'Пользователь уже существует' });
    return;
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      about,
      avatar,
      email,
      password: passwordHash,
    });
    res.status(200).send(user);
  } catch (err) {
    if (err.errors) {
      res
        .status(BAD_REQ_ERROR)
        .send({ message: 'Переданы некорректные данные' });
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
      res
        .status(BAD_REQ_ERROR)
        .send({ message: 'Переданы некорректные данные' });
      return;
    }
    res
      .status(SERVER__ERROR)
      .send({ message: 'Произошла ошибка на сервере', ...err });
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
      res
        .status(BAD_REQ_ERROR)
        .send({ message: 'Переданы некорректные данные' });
      return;
    }
    res.status(SERVER__ERROR).send({ message: 'Произошла ошибка на сервере' });
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res
      .status(NOT_FOUND_ERROR)
      .send({ message: 'Незаполнены обязательные поля' });
    return;
  }

  try {
    const user = await User.findOne({ email }).select('+password');
    const isUserValid = await bcrypt.compare(password, user.password);
    if (isUserValid) {
      const token = jwt.sign({
        _id: user._id,
      }, 'SECRET');
      res.cookie('jwt', token, {
        maxAge: 3600000,
        httpOnly: true,
        sameSite: true,
      });
      res.send({ data: user.toJSON() });
    } else {
      res.status(403).send({ message: 'Неправильный пароль' });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUserInfo,
  updateUserAvatar,
  login,
};
