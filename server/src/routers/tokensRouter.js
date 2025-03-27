const authController = require('../controllers/authController');
const verifyRefreshToken = require('../middlewares/verifyRefreshToken');

const tokensRouter = require('express').Router();

tokensRouter.get('/refresh', verifyRefreshToken, authController.refresh);

module.exports = tokensRouter;
