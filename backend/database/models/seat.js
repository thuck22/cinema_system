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
    seatId: DataTypes.STRING,
    roomId: DataTypes.STRING,
    seatType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['SINGLE', 'COUPLE', 'VIP']],
      },
    },
    seatPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 20
    },
    status: DataTypes.BIT
  }, {
    sequelize,
    modelName: 'Seat',
  });
  return Seat;
};