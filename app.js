const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { NotFound } = require('./utils/errors');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use((req, res, next) => {
  req.user = {
    _id: '6572e0a21528f5228a581fbe',
  };

  next();
});

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('*', (req, res) => {
  res.status(NotFound).send({ message: 'Страница не найдена' });
});

app.listen(PORT);