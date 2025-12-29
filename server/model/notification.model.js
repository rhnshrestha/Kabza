module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define("notification", {
    notification_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    sent_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    // FOREIGN KEY: Link to the User
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    },
    // FOREIGN KEY: Link to the Event
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "special_events",
        key: "event_id"
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    }
  }, {
    timestamps: false // sent_at handles the timing logic
  });
  return Notification;
};