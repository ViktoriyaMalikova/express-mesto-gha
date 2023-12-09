const User = require('../models/user');

const {
  Created,
  CastError,
  NotFound,
  InternalServerError,
} = require('../utils/errors');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(InternalServerError).send({ message: 'На сервере произошла оибка' }));
};

module.exports.addUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(Created).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(CastError).send({ message: err.message });
      } else {
        res.status(InternalServerError).send({ message: 'На сервере произошла оибка' });
      }
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(new Error('NotFound'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(CastError).send({ message: 'Некорректный id' });
      } else if (err.message === 'NotFound') {
        res.status(NotFound).send({ message: 'Пользоваетль по указанному id не найден' });
      } else {
        res.status(InternalServerError).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.editDataUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: 'true', runValidators: true })
    .orFail(new Error('NotFound'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(CastError).send({ message: err.message });
      } else if (err.message === 'NotFound') {
        res.status(NotFound).send({ message: 'Пользоваетль по указанному id не найден' });
      } else {
        res.status(InternalServerError).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.editAvatarUser = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: 'true', runValidators: true })
    .orFail(new Error('NotFound'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(CastError).send({ message: err.message });
      } else if (err.message === 'NotFound') {
        res.status(NotFound).send({ message: 'Пользоваетль по указанному id не найден' });
      } else {
        res.status(InternalServerError).send({ message: 'На сервере произошла ошибка' });
      }
    });
};
