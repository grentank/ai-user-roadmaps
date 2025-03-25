const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig');
require('dotenv').config();

module.exports = function verifyRefreshToken(req, res, next) {
  try {
    const { refreshToken } = req.cookies;
    const { user } = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      jwtConfig.refresh,
    );
    res.locals.user = user;
    next();
  } catch (error) {
    console.log('Invalid refresh token');
    res.sendStatus(401);
  }
};
