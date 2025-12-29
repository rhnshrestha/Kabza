module.exports = (sequelize, DataTypes) => {
    const BookingStatus = sequelize.define("booking_status", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        status_name: {
            type: DataTypes.ENUM("pending", "confirmed", "cancelled"),
            allowNull: false,
            unique: true // Ensures no duplicate status types
        }
    }, {
        freezeTableName: true, 
        timestamps: true
    });
    return BookingStatus;
};