module.exports = function(sequelize, DataTypes) {
    var Ingredient = sequelize.define('Ingredient', {
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        expiration:{
            type:DataTypes.DATEONLY,
            allowNull:false
        },
        category:{
            type:DataTypes.STRING,
            allowNull:false,
        },
    });

    Ingredient.associate = function(models) {
        // add associations here
        Ingredient.belongsTo(models.User);
        // Ingredient.belongsToMany(models.Category,{through:"IngredientCategory"})
    };

    return Ingredient;
};