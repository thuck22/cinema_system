'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cinemaRoom extends Model {
    static associate(models) {
      // define association here
    }
    
  }
  cinemaRoom.init({
    roomId:{
      type: DataTypes.STRING,
      primaryKey: true,
    },
    theaterId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
   //  what are room types?
    roomType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    seatNum: {
      type: DataTypes.INTEGER,
      defaultValue: 20,
    },
  },{
    sequelize,
    modelName: 'cinemaRoom',
  });
  return cinemaRoom;
};