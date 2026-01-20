require('./database/connect');
require('./algorithm/notificationService');

const express = require("express");
const app = express();
const cors = require('cors');
const bookingRoute = require("./routes/bookingRoute")
const tableRoute = require("./routes/tableRoute")
const adminRoute = require("./routes/adminRoute")
const userRoute = require("./routes/userRoute")
const eventRoute = require("./routes/eventRoute")

app.use(express.json());
app.use(cors());
app.use("/api",bookingRoute);
app.use("/api",tableRoute);
app.use("/api",adminRoute);
app.use("/api",userRoute);
app.use("/api",eventRoute);


app.listen(8808,()=>{
    console.log("server started");
});

//server run garayo
//database snga connect gryo
//admins table banayo tara sync grna baki xa