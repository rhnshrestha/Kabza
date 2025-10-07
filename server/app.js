require('./database/connect')
const express = require("express");
const app = express();

app.get('/', (req,res)=>{
    res.send("server is running hai ta");
})


app.listen(8808,()=>{
    console.log("server started");
});

//server run garayo
//database snga connect gryo
//admins table banayo tara sync grna baki xa