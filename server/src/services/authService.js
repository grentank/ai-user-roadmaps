const { User } = require('../../db/models');
const bcrypt = require('bcrypt');
class AuthService {
  async createAccount({ email, password, name }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [createdUser, created] = await User.findOrCreate({
      where: {
        email,
      },
      defaults: {
        name,
        hashedPassword,
      },
    });
    if (!created) throw new Error('Ошибка регистрации (пользователь уже существует)');
    return createdUser.get();
  }

  async loginUser({ email, password }) {
    const foundUser = await User.findOne({
      where: { email },
    });
    if (!foundUser) throw new Error('Ошибка входа. Такой почты не существует.');
    const isValidPassword = await bcrypt.compare(password, foundUser.hashedPassword);
    if (!isValidPassword) throw new Error(`Неверный пароль. Нужно другой`);
    return foundUser.get();
  }
}

const authService = new AuthService();

module.exports = authService;
