const Card = require('../models/card');

const {
  Created,
  CastError,
  NotFound,
  InternalServerError,
} = require('../utils/errors');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch(() => res.status(InternalServerError).send({ message: 'На сервере произошла ошибка' }));
};

module.exports.addCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      Card.findById(card._id)
        .populate('owner')
        .then((data) => res.status(Created).send(data))
        .catch(() => res.status(NotFound).send({ message: 'Карточка по указанному id не найдена' }));
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(CastError).send({ message: err.message });
      } else {
        res.status(InternalServerError).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .orFail(new Error('NotFound'))
    .then(() => { res.send({ message: 'Карточка успешно удалена' }); })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(CastError).send({ message: 'Некорректный id' });
      } else if (err.message === 'NotFound') {
        res.status(NotFound).send({ message: 'Карточка по указанному id не найдена' });
      } else {
        res.status(InternalServerError).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .populate(['owner', 'likes'])
    .orFail(new Error('NotFound'))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(CastError).send({ message: 'Некорректный id' });
      } else if (err.message === 'NotFound') {
        res.status(NotFound).send({ message: 'Карточка по указанному id не найдена' });
      } else {
        res.status(InternalServerError).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .populate(['owner', 'likes'])
    .orFail(new Error('NotFound'))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(CastError).send({ message: 'Некорректный id' });
      } else if (err.message === 'NotFound') {
        res.status(NotFound).send({ message: 'Карточка по указанному id не найдена' });
      } else {
        res.status(InternalServerError).send({ message: 'На сервере произошла ошибка' });
      }
    });
};
