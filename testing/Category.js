// module.exports = function(sequelize, DataTypes){
//     var Category = sequelize.define("Category",{
//         name:{
//             type:DataTypes.STRING,
//             unique:true,
//             allowNull:false
//         }
//     })

//     Category.associate = function(models){
//         Category.belongsToMany(models.Ingredient, {through:"IngredientCategory"})
//     }

//     return Category;
// }