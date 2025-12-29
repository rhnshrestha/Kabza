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
const Notification = require('../model/notification.model')(sequelize, DataTypes);
const SpecialEvent = require('../model/special_event.model')(sequelize, DataTypes);

// Links Booking to Table using the table_id column
Booking.belongsTo(Table, { foreignKey: 'table_id' }); 
Table.hasMany(Booking, { foreignKey: 'table_id' });

// Links Booking to Status using the status_id column
Booking.belongsTo(BookingStatus, { foreignKey: 'status_id' });
BookingStatus.hasMany(Booking, { foreignKey: 'status_id' });

// --- CRITICAL FOR ALGORITHM ---
// Links User to Booking so the algorithm can see who booked before
User.hasMany(Booking, { foreignKey: 'user_id' });
Booking.belongsTo(User, { foreignKey: 'user_id' });

// --- NOTIFICATION SYSTEM ---
// Links Notifications to Users
User.hasMany(Notification, { foreignKey: 'user_id' });
Notification.belongsTo(User, { foreignKey: 'user_id' });

// Links Notifications to the Special Event that triggered them
SpecialEvent.hasMany(Notification, { foreignKey: 'event_id' });
Notification.belongsTo(SpecialEvent, { foreignKey: 'event_id' });

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

module.exports = { sequelize, Admin, User, Table, Booking, BookingStatus, Notification, SpecialEvent };