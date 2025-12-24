const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("table_bs", "root", "!rhn@sql25", {
  host: "localhost",
  dialect: "mysql",
  port: 3306, 
});

// import path for models
const Admin = require('../model/admin.model')(sequelize, DataTypes);
const User = require('../model/user.model')(sequelize, DataTypes);
const Table = require('../model/table.model')(sequelize, DataTypes);
const Booking = require('../model/booking.model')(sequelize,DataTypes);
const BookingStatus = require('../model/booking_status.model')(sequelize, DataTypes);

Booking.belongsTo(Table, { foreignKey: 'id' });
Booking.belongsTo(BookingStatus, { foreignKey: 'id' });

sequelize.authenticate()
  .then(() => {
    console.log("database pani connected vo");
    return sequelize.sync({ alter: false });
  })
  .then(() => {
    console.log("migrate vayo");
  })
  .catch((err) => {
    console.log("error aayo" + err);
  });

module.exports = { sequelize, Admin, User, Table, Booking, BookingStatus };