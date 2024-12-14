'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Showtime extends Model {

    static associate(models) {
      // define association here
    }
  }
  Showtime.init({
    showtimerId:{
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    theaterId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    movieId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cinemaRoomId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    showDay: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    format: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['2D','3D','IMAX']],
      },
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  },{
    sequelize,
    modelName: 'Showtime',
  });
  return Showtime;
};