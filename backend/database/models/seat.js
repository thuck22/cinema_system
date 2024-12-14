'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Seat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    
  }
  Seat.init({
    seatId:{
      type: DataTypes.STRING,
      primaryKey: true,
    },
    theaterId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cinemaroomId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
   //  what are room types?
    seatType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['SINGLE','COUPLE','VIP']],
      },
    },
    // reference seat price entity
    //add store precedure
    seatPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 20
    },
  },{
    sequelize,
    modelName: 'Seat',
  });
  return Seat;
};