'use strict';

const { User } = require('../models');
const bcrypt = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return User.bulkCreate([
      {
        name: 'Саша',
        email: 'sasha@mail.com',
        hashedPassword: bcrypt.hashSync('123', 10),
      },
      {
        name: 'Сергей',
        email: 'sergey@mail.com',
        hashedPassword: bcrypt.hashSync('123', 10),
      },
      {
        name: 'Ваня',
        email: 'vanya@mail.com',
        hashedPassword: bcrypt.hashSync('123', 10),
      },
      {
        name: 'Оля',
        email: 'olya@mail.com',
        hashedPassword: bcrypt.hashSync('123', 10),
      },
      {
        name: 'Юля',
        email: 'julia@mail.com',
        hashedPassword: bcrypt.hashSync('123', 10),
      },
      {
        name: 'Кирилл',
        email: 'kirill@mail.com',
        hashedPassword: bcrypt.hashSync('123', 10),
      },
      {
        name: 'Вадим',
        email: 'vadim@mail.com',
        hashedPassword: bcrypt.hashSync('123', 10),
      },
      {
        name: 'Денис',
        email: 'denchik@mail.com',
        hashedPassword: bcrypt.hashSync('123', 10),
      },
      {
        name: 'Кузьма',
        email: 'kuzma@mail.com',
        hashedPassword: bcrypt.hashSync('123', 10),
      },
      {
        name: 'Лёша',
        email: 'lesha@mail.com',
        hashedPassword: bcrypt.hashSync('123', 10),
      },
      {
        name: 'Томас',
        email: 'thomas@mail.com',
        hashedPassword: bcrypt.hashSync('123', 10),
      },
      {
        name: 'Милана',
        email: 'meelana@mail.com',
        hashedPassword: bcrypt.hashSync('123', 10),
      },
      {
        name: 'Таня',
        email: 'tanya@mail.com',
        hashedPassword: bcrypt.hashSync('123', 10),
      },
      {
        name: 'Крис',
        email: 'chris@mail.com',
        hashedPassword: bcrypt.hashSync('123', 10),
      },
      {
        name: 'Джон',
        email: 'john@mail.com',
        hashedPassword: bcrypt.hashSync('123', 10),
      },
      {
        name: 'Лида',
        email: 'lidya@mail.com',
        hashedPassword: bcrypt.hashSync('123', 10),
      },
      {
        name: 'Маша',
        email: 'masha@mail.com',
        hashedPassword: bcrypt.hashSync('123', 10),
      },
      {
        name: 'Влад',
        email: 'vlad@mail.com',
        hashedPassword: bcrypt.hashSync('123', 10),
      },
      {
        name: 'Павел',
        email: 'pavel@mail.com',
        hashedPassword: bcrypt.hashSync('123', 10),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
