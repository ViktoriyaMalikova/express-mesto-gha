const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const auth = require('../middlewares/auth');
const signupRouter = require('./signup');
const signinRouter = require('./signin');

router.use('/signup', signupRouter);
router.use('/signin', signinRouter);
router.use(auth);
router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

module.exports = router;
