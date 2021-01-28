module.exports = function(sequelize, DataTypes){
    const Ingredient = sequelize.define("Ingredient", {
        ingredient: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        expiration: {
            type: DataTypes.DATE,
            allowNull: true,
            validate: {
                isDate: true
            }
        }
    });

    Ingredient.associate = function(models){
        Ingredient.belongsTo(models.User);
    };

    return Ingredient;
};