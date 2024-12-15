"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Movie extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Movie.init(
        {
            movieId: {
                type: DataTypes.STRING,
                primaryKey: true
            },
            movieName: DataTypes.STRING,
            duration: DataTypes.INTEGER,
            trailer: DataTypes.STRING,
            premiereDay: DataTypes.DATE,
            movieLabel: DataTypes.STRING
        },
        {
            sequelize,
            modelName: "Movie",
            timestamps: false
        }
    );
    return Movie;
};
