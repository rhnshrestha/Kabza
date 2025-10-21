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
    },
    table_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      references: {
        model: "tables",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "booking_status",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },{
    timestamps: true
  });
  return Booking;
};
