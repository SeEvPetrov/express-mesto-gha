const express = require('express');

const routes = express.Router();
const { userRoutes } = require('./users');
const { cardRoutes } = require('./cards');
const { login, createUser } = require('../controllers/users');

routes.post('/signin', express.json(), login);
routes.post('/signup', express.json(), createUser);

routes.use('/users', userRoutes);
routes.use('/cards', cardRoutes);

module.exports = { routes };
