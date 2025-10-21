const {Admin} = require("../database/connect");
const createAdmin = async(req, res)=>{
    const {username, password} = req.body;
    if(!username || !password){
        return res.status(400).json({
            message: "all fields are required"
        })
    }

    const admins = await Admin.create({
        username,
        password
    });

    res.status(201).json({
        message: "new admin created",
        admins
    })
}

module.exports = {createAdmin}