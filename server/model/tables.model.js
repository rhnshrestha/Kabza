

module.exports = (sequelize, DataTypes) => {
    const Tables = sequelize.define("tables", {
         table_no: {
            type: DataTypes.INTEGER,
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
         }
});
return Tables;
}