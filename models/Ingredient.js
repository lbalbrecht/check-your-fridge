module.exports = function(sequelize, DataTypes) {
    var Ingredient = sequelize.define('Ingredient', {
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        date:{
            type:DataTypes.DATE,
            allowNull:true,
            validate: {
                isDate: true
            }
        },
        category:{
            type:DataTypes.STRING,
            allowNull:false,
        },
    });

    Ingredient.associate = function(models) {
        // add associations here
        Ingredient.belongsTo(models.User);
        // Review.belongsToMany(models.Platform,{through:"ReviewPlatform"})
    };

    return Ingredient;
};