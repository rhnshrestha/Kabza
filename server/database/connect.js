const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("table_bs", "root", "!rhn@sql25", {
  host: "localhost",
  dialect: "mysql",
  port: 3306, // default MySQL port
});

// Corrected import path for Admins model
const Admins = require('../model/admins.model')(sequelize, DataTypes);
const Tables = require('../model/tables.model')(sequelize, DataTypes);

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

module.exports = { sequelize, Admins, Tables };