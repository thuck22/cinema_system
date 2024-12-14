'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Theater extends Model {

    static associate(models) {
      // define association here
    }
    
  }
  Theater.init({
    theaterId:{
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    theaterName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city_province: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    district: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },{
    sequelize,
    modelName: 'Theater',
  });
  return Theater;
};