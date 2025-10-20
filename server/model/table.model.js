

module.exports = (sequelize, DataTypes) => {
    const Table = sequelize.define("table", {
         table_no: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
         },
         capacity: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         status: {
            type: DataTypes.ENUM("available","unavailable"),
            defaultValue: "available"
         },
      },{
         timestamps: true
});
return Table;
}