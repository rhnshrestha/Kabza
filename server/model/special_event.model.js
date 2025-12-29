module.exports = (sequelize, DataTypes) => {
  const SpecialEvent = sequelize.define("special_event", {
    event_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    event_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    event_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    event_description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    timestamps: true
  });
  return SpecialEvent;
};