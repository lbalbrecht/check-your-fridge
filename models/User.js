module.exports = function(sequelize, Datatypes){
    const User = sequelize.define("User", {
        username: {
            type: Datatypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        password: {
            type: Datatypes.STRING,
            allowNull: false,
            vaidate: {
                len: [1]
            }
        }
    });

    User.associate = function(models){
        User.hasMany(models.Fridge)
    };

    return User;
};