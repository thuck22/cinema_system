'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class movieGenre extends Model {

        static associate(models) {
            // define association here
        }
    }
    movieGenre.init({
        movieId: DataTypes.STRING,
        movieGenreId: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'movieGenre',
    });
    return movieGenre;
};