const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("table_bs", "root", "!rhn@sql25", {
  host: "localhost",
  dialect: "mysql",
  port: 3306, 
});

// import path for models
const Admin = require('../model/admin.model')(sequelize, DataTypes);
const Table= require('../model/table.model')(sequelize, DataTypes);
const Booking = require('../model/booking.model')(sequelize,DataTypes);
const BookingStatus = require('../model/booking_status.model')(sequelize, DataTypes);

sequelize.authenticate()
  .then(() => {
    console.log("database pani connected vo");
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log("migrate vayo");
  })
  .catch((err) => {
    console.log("error aayo" + err);
  });

module.exports = { sequelize, Admin, Table, Booking, BookingStatus };