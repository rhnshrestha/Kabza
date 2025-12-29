module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true // Ensures only valid emails are saved
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
       
    },
    {
        timestamps: true
    });

    return User;
};