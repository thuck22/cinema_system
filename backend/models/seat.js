"use strict";
const { Model } = require("sequelize");
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
    Seat.init(
        {
            seatId: {
                type: DataTypes.STRING,
                primaryKey: true
            },
            showtimeId: DataTypes.STRING,
            roomId: DataTypes.STRING,
            seatType: DataTypes.STRING,
            seatPrice: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Seat",
            timestamps: false
        }
    );
    return Seat;
};
