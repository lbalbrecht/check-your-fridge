require('dotenv').config()
const axios = require("axios").default;
const ingredient = 'chicken'

function findRecipe(listOfIngredients){
  var options = {
    method: 'GET',
    url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients',
    params: {
      ingredients: listOfIngredients,
      number: '50',
      ranking: '1',
      ignorePantry: 'true',
      type: 'main course'
    },
    headers: {
      'x-rapidapi-key': process.env.X_RAPIDAPI_KEY,
      'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
    }
  };

  axios.request(options).then(function (response) {
    // console.log(response.data[25].id);
    let randomNum = Math.floor(Math.random() * (50 - 10 + 1) ) + 10;
    for (let i = 0; i < 10; i++) {
      randomNum-- 
      findRecipeInfo(response.data[randomNum].id)
    }
    // return findRecipeInfo(response.data[25].id)
  }).catch(function (error) {
    console.error(error);
  });

}

function findRecipeInfo(id){
  const options = {
    method: 'GET',
    url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information`,
    headers: {
      'x-rapidapi-key': process.env.X_RAPIDAPI_KEY,
      'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
    }
  };
  
  axios.request(options).then(function (response) {
    // console.log(response.data)
    console.log(response.data.title)
    // console.log(response.data.sourceUrl)
    // console.log(response.data.summary)
    // console.log(response.data.instructions)
    // let ingredientAmount = response.data.extendedIngredients
    // ingredientAmount.forEach(element => {
    //   console.log(element.originalString);
    // });
    // console.log(response.data.extendedIngredients[0].originalString);
    // console.log(recipe);
    
    return response.data;
  }).catch(function (error) {
    console.error(error);
  });
}

findRecipe(ingredient);
// console.log("test " + findRecipe(ingredient));

// var ingredients = 'apples,flour,sugar'

// findRecipe(ingredients);

