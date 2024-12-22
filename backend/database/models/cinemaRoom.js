'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cinemaRoom extends Model {
    static associate(models) {
      // define association here
    }

  }
  cinemaRoom.init({
    roomId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    theaterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    //  what are room types?
    roomType: DataTypes.STRING,
    seatNum: {
      type: DataTypes.INTEGER,
      defaultValue: 20,
    },
  }, {
    sequelize,
    modelName: 'cinemaRoom',
  });
  return cinemaRoom;
};