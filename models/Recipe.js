module.exports = function(sequelize, DataTypes) {
    var Recipe = sequelize.define('Recipe', {
        title:{
            type:DataTypes.STRING,
            allowNull:false
        },
        url:{
            type:DataTypes.STRING,
            allowNull:false
        },
        summary:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        instructions:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        ingredients:{
            type:DataTypes.STRING,
            allowNull:false
        },

    });

    Recipe.associate = function(models) {
        // add associations here
        Recipe.belongsTo(models.User);
    };

    return Recipe;
};