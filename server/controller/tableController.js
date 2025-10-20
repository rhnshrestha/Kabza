const{Table} = require("../database/connect");
const fetchTables = async(req, res)=>{
    const datas = await Table.findAll();

    res.json({
        message: "Tables fetched successfully",
        datas
    })
}

const createTable = async(req, res)=>{
    const{table_no, capacity, status} = req.body;
    if(!table_no || !capacity || !status){
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const newTable = await Table.create({
        table_no,
        capacity,
        status
    });

    res.status(201).json({
        message: "table inserted successfully",
        table: newTable    })
}

module.exports = {fetchTables,createTable}