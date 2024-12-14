'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {

    static associate(models) {
      // define association here
    }
    
  }
  Ticket.init({
    ticketId:{
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    customerEmail:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    orderId:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    showtimeId:{
      type: DataTypes.STRING,
      allowNull: false
    },
    seatId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //default value of Seat price
    ticketPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    boughtTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.Now
    },
  },{
    sequelize,
    modelName: 'Ticket',
  });
  return Ticket;
};