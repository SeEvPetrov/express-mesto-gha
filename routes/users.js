const express = require('express');

const userRoutes = express.Router();
const {
  createUser, getUsers, getUserById, updateUserInfo, updateUserAvatar,
} = require('../controllers/users');

userRoutes.post('/', express.json(), createUser);
userRoutes.get('/', express.json(), getUsers);
userRoutes.get('/:id', express.json(), getUserById);
userRoutes.patch('/me', express.json(), updateUserInfo);
userRoutes.patch('/me/avatar', express.json(), updateUserAvatar);

module.exports = { userRoutes };
