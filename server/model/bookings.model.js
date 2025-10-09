module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define("booking", {
    customer_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: false
    },
    booking_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    booking_time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    people: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  return Booking;
};
