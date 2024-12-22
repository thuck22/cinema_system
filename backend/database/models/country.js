'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Country extends Model {

        static associate(models) {
            // define association here
        }

    }
    Country.init({
        movieId: DataTypes.STRING,
        countryName: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Country',
    });
    return Country;
};