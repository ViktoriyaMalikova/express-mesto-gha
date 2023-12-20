const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const NotFound = 404;

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

app.use('/', require('./routes/index'));

app.use('*', (req, res) => {
  res.status(NotFound).send({ message: 'Страница не найдена' });
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.listen(PORT);
