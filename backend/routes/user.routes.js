const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const auth = require('../middleware/auth');

// auth
router.post("/register", authController.signUp);
router.post('/login', authController.signIn);
router.get('/logout', authController.logout);

// user db
router.get('/', auth, userController.getAllUsers);
router.get('/:id', auth, userController.userInfo);
router.delete('/:id', auth, userController.deleteUser);

module.exports = router;