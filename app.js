require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const cookieParser = require('cookie-parser');

const { PORT = 3000 } = process.env;
const app = express();
const { routes } = require('./routes');
const { NOT_FOUND_ERROR } = require('./errors/errors');

app.use(cookieParser());

app.use(routes);

app.use('*', (req, res, next) => {
  res.status(NOT_FOUND_ERROR).send({ message: 'Такого запроса нет' });
  next();
});

async function main() {
  try {
    await mongoose.connect('mongodb://localhost:27017/mestodb', {
      useNewUrlParser: true,
      useUnifiedTopology: false,
    });
    await app.listen(PORT);
    console.log(`Сервер запущен на ${PORT} порту`);
  } catch (err) {
    console.log(`Возникла ошибка: ${err} `);
  }
}

main();
