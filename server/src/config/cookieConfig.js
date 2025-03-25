const jwtConfig = require('./jwtConfig');

const cookieConfig = {
  maxAge: jwtConfig.refresh.expiresIn,
  httpOnly: true,
  // sameSite
  // secure
};

module.exports = cookieConfig;
