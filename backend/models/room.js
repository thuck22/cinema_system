"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Room extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Room.init(
        {
            roomId: {
                type: DataTypes.STRING,
                primaryKey: true
            },
            roomType: DataTypes.STRING,
            seatNum: DataTypes.INTEGER,
            theaterId: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Room",
            tableName: "cinemaRooms",
            timestamps: false
        }
    );
    return Room;
};
