module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define("booking", {
    // Keep existing fields
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
    // ADD THIS NEW FIELD TO LINK TO THE USER TABLE
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false, // Set to false so every booking belongs to an account
      references: {
        model: "users", // Must match your 'users' table name
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
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