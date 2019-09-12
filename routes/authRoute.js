const router = require('express').Router();
const { checkAuthenticated, checkNotAuthenticated } = require('../authentication/verifyToken');
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/token', authController.token);
router.get('/logout', checkAuthenticated, authController.logout);

module.exports = router;