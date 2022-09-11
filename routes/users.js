const express = require('express');

const userRoutes = express.Router();
const {
  getUsers, getUserById, updateUserInfo, updateUserAvatar,
} = require('../controllers/users');

userRoutes.get('/', express.json(), getUsers);
userRoutes.get('/:id', express.json(), getUserById);
userRoutes.patch('/me', express.json(), updateUserInfo);
userRoutes.patch('/me/avatar', express.json(), updateUserAvatar);

module.exports = { userRoutes };
