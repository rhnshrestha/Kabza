require('./database/connect')
const express = require("express");
const app = express();
const bookingRoute = require("./routes/bookingRoute")

app.use(express.json());

app.use("/api",bookingRoute);


app.listen(8808,()=>{
    console.log("server started");
});

//server run garayo
//database snga connect gryo
//admins table banayo tara sync grna baki xa