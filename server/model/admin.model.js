module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define("admin", {
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },{
        timestamps: true
    });
    return Admin;
}