module.exports = (sequelize, DataTypes) => {
    const Admins = sequelize.define("admins", {
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return Admins;
}