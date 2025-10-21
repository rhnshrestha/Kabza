const{Table} = require("../database/connect");

const fetchTables = async(req, res)=>{
    const data = await Table.findAll();

    res.json({
        message: "Tables fetched successfully",
        data
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

const editTable = async(req, res)=>{
    const id = req.params.id;
    const {table_no, capacity, status} = req.body;
    await Table.update({table_no, capacity, status}, { where : 
        {
         id : id
        }});
        
        res.status(201).json({
            message: "table updated successfully"
        })
}

const deleteTable = async(req, res)=>{
    const id = req.params.id;
    await Table.destroy({where: {
        id : id
    }});
    res.status(201).json({
        message: "table deleted successfully"
    })
}

module.exports = {fetchTables,createTable,editTable,deleteTable}