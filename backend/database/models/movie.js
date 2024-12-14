'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {

    static associate(models) {
      // define association here
    }

  }
  Movie.init({
    movieId: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    movieName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    movieLabel: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    premiereDay: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    trailer: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    duration: DataTypes.INTERGER
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};