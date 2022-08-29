const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
// создаем сервер
const app = express();
const { routes } = require('./routes');

// app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  req.user = {
    _id: '630c97ef1ea76b2625787454',
  };

  next();
});

app.use('/', (req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.use(routes);

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });

  await app.listen(PORT);
  console.log(`Сервер запущен на ${PORT} порту`);
}

main();
