const authController = require('../controllers/authController');
const verifyRefreshToken = require('../middlewares/verifyRefreshToken');

const tokenRouter = require('express').Router();

tokenRouter.get('/refresh', verifyRefreshToken, authController.refresh);

module.exports = tokenRouter;
