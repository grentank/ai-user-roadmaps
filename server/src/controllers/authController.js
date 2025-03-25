const cookieConfig = require('../config/cookieConfig');
const authService = require('../services/authService');
const generateTokens = require('../utils/generateTokens');

class AuthController {
  #service;

  constructor(service) {
    this.#service = service;
  }

  #sendTokens = (res, user) => {
    const { accessToken, refreshToken } = generateTokens({ user });
    return res
      .status(200)
      .cookie('refreshToken', refreshToken, cookieConfig)
      .json({ user, accessToken });
  };

  signup = async (req, res) => {
    try {
      if (!req.body) return res.status(400).json({ message: 'Требуется тело запроса' });
      if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).json({ message: 'Указаны не все поля' });
      }
      const user = await authService.createAccount(req.body);
      delete user.hashedPassword;
      this.#sendTokens(res, user);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  };

  signin = async (req, res) => {
    try {
      if (!req.body.email || !req.body.password) {
        return res.status(400).json({ message: 'Указаны не все поля' });
      }
      const user = await authService.loginUser(req.body);
      delete user.hashedPassword;
      this.#sendTokens(res, user);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  };

  logout = async (req, res) => {
    res.clearCookie('refreshToken');
    return res.status(200).json({ message: 'Вы успешно вышли из системы' });
  };

  refresh = async (req, res) => {
    const { user } = res.locals;
    this.#sendTokens(res, user);
  };
}

const authController = new AuthController(authService);

module.exports = authController;
