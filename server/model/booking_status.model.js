module.exports = (sequelize, DataTypes) => {
  const BookingStatus = sequelize.define("booking_status", {
    status_name: {
      type: DataTypes.ENUM("pending", "confirmed", "cancelled"),
      unique: true,
      allowNull: false
    }
  }, {
    freezeTableName: true //prevents pluralizing the table name
  });
  return BookingStatus;
};