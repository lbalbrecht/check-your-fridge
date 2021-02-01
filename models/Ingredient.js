module.exports = function(sequelize, DataTypes) {
    var Ingredient = sequelize.define('Ingredient', {
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        expiration:{
            type:DataTypes.STRING,
            allowNull:true,
            // validate: {
            //     len: [8],
            //     msg: "Please enter date in 00/00/00 format"
            // }
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