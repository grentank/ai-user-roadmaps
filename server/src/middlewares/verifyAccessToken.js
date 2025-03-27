require('dotenv').config();
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig');

module.exports = function verifyAccessToken(req, res, next) {
  try {
    const accessToken = req.headers.authorization.split(' ')[1];
    const { user } = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET,
      jwtConfig.access,
    );
    res.locals.user = user;
    next();
  } catch (error) {
    console.log('Неверный access token');
    res.sendStatus(403);
  }
};
