const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig');
require('dotenv').config();

function authenticate(req, next) {
  cookieParser()(req, {}, () => {
    try {
      const { refreshToken } = req.cookies;
      const { user } = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        jwtConfig.refresh,
      );
      next(null, user);
    } catch (error) {
      console.log('Invalid socket authentication');
      next(error);
    }
  });
}

module.exports = authenticate;
