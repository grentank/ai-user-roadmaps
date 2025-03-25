'use strict';

const { Place } = require('../models');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return Place.bulkCreate([
      {
        name: 'Эйфелева башня',
        order: 3,
        geo: '48.8584° N, 2.2945° E',
        image: 'eiffel.jpg',
        userId: 1,
      },
      {
        name: 'Статуя Свободы',
        order: 1,
        geo: '40.6892° N, 74.0445° W',
        image: 'liberty-statue.jpg',
        userId: 1,
      },
      {
        name: 'Колизей',
        order: 2,
        geo: '41.8902° N, 12.4922° E',
        image: 'Kolizey.jpg',
        userId: 1,
      },
      {
        name: 'Великая Китайская стена',
        order: 2,
        geo: '40.4319° N, 116.5704° E',
        image: 'great-china.jpeg',
        userId: 2,
      },
      {
        name: 'Мачу-Пикчу',
        order: 3,
        geo: '13.1631° S, 72.5450° W',
        image: 'machu_pikchu.jpg',
        userId: 2,
      },
      {
        name: 'Тадж-Махал',
        order: 1,
        geo: '27.1751° N, 78.0421° E',
        image: 'taj-mahal.webp',
        userId: 2,
      },
      {
        name: 'Петра',
        order: 1,
        geo: '30.3285° N, 35.4444° E',
        image: 'petra.jpg',
        userId: 3,
      },
      {
        name: 'Сиднейский оперный театр',
        order: 2,
        geo: '33.8569° S, 151.2153° E',
        image: 'Sidnejski.jpg',
        userId: 3,
      },
      {
        name: 'Пирамиды Гизы',
        order: 3,
        geo: '29.9792° N, 31.1342° E',
        image: 'piramidy-gizy.jpg',
        userId: 3,
      },
      {
        name: 'Храм Спаса-на-Крови',
        order: 1,
        geo: '59.9400° N, 30.3289° E',
        image: 'spas-na-krovi.jpeg',
        userId: 4,
      },
      {
        name: 'Великая Китайская стена',
        order: 4,
        geo: '40.4319° N, 116.5704° E',
        image: 'great-china.jpeg',
        userId: 1,
      },
      {
        name: 'Мачу-Пикчу',
        order: 5,
        geo: '13.1631° S, 72.5450° W',
        image: 'machu_pikchu.jpg',
        userId: 1,
      },
      {
        name: 'Тадж-Махал',
        order: 6,
        geo: '27.1751° N, 78.0421° E',
        image: 'taj-mahal.webp',
        userId: 1,
      },
      {
        name: 'Петра',
        order: 7,
        geo: '30.3285° N, 35.4444° E',
        image: 'petra.jpg',
        userId: 1,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Places', null, {});
  },
};
