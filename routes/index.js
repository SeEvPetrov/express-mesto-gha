const express = require('express');

const routes = express.Router();
const { userRoutes } = require('./users');
const { cardRoutes } = require('./cards');
const { login, createUser } = require('../controllers/users');
const { BadRequestError } = require('../errors/index');
const auth = require('../middlewares/auth');

routes.post('/signup', express.json(), createUser);
routes.post('/signin', express.json(), login);

routes.use(auth);
routes.use('*', (req, res, next) => next(new BadRequestError('Такого запроса не существует')));

routes.use('/users', userRoutes);
routes.use('/cards', cardRoutes);

module.exports = { routes };
