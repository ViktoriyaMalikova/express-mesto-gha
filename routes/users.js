const router = require('express').Router();
const {
  addUser,
  getUsers,
  getUserById,
  editDataUser,
  editAvatarUser,
} = require('../controllers/users');

router.post('/', addUser);
router.get('/', getUsers);
router.get('/:userId', getUserById);
router.patch('/me', editDataUser);
router.patch('/me/avatar', editAvatarUser);

module.exports = router;
