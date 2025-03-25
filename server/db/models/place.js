'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Place extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  }
  Place.init(
    {
      name: DataTypes.STRING,
      order: DataTypes.INTEGER,
      geo: DataTypes.STRING,
      image: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Place',
    },
  );
  return Place;
};
