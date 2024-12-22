"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Showtime extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Showtime.init(
        {
            showtimeId: {
                type: DataTypes.STRING,
                primaryKey: true
            },
            format: DataTypes.STRING,
            showDay: DataTypes.DATE,
            startTime: DataTypes.TIME,
            endTime: DataTypes.TIME,
            movieId: DataTypes.STRING,
            cinemaRoomId: DataTypes.STRING
        },
        {
            sequelize,
            modelName: "Showtime",
            timestamps: false
        }
    );
    return Showtime;
};
