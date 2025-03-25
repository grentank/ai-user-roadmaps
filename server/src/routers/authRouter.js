const authRouter = require('express').Router();
const authController = require('../controllers/authController');

authRouter.post('/signup', authController.signup);

authRouter.post('/login', authController.signin);

authRouter.delete('/logout', authController.logout);

module.exports = authRouter;
