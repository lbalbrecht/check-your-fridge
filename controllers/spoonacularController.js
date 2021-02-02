require('dotenv').config()
const axios = require("axios").default;
const ingredient = 'chicken'
const express = require("express");
const router = express.Router();
let listRecipes = [];

router.post("/", (req, res) => {
  console.log(req.body);
  findRecipe(req.body.searchIngredients, res)

})


// async function findRecipeTest(listOfIngredients) {
//   var options = {
//     method: 'GET',
//     url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients',
//     params: {
//       ingredients: listOfIngredients,
//       number: '1',
//       ranking: '1',
//       ignorePantry: 'true',
//       type: 'main course'
//     },
//     headers: {
//       'x-rapidapi-key': process.env.X_RAPIDAPI_KEY,
//       'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
//     }
//   };
//   const response = await axios.request(options)
//   return response.data
// }

// findRecipe(ingredient);
function findRecipe(listOfIngredients, res) {
  console.log(`inside find recipe function ${listOfIngredients}`);
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
    let randomNum = Math.floor(Math.random() * (50 - 10 + 1)) + 10;
    for (let i = 0; i < 10; i++) {
      randomNum--

      const options = {
        method: 'GET',
        url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${response.data[randomNum].id}/information`,
        headers: {
          'x-rapidapi-key': process.env.X_RAPIDAPI_KEY,
          'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
        }
      };


      listRecipes.push(axios.request(options))

    }

    const result = Promise.all(listRecipes)
    result.then(response => {
      const data = response.map(recipe=>recipe.data)
      console.log(`data for recipes ${data}`)
      listRecipes = [];
      res.json(data);
    }).catch(error => console.log(error));

  })
}
function findRecipeInfo(id) {
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
    // console.log(response.data.title)
    // console.log(response.data.sourceUrl)
    // console.log(response.data.summary)
    // console.log(response.data.instructions)
    // let ingredientAmount = response.data.extendedIngredients
    // ingredientAmount.forEach(element => {
    //   console.log(element.originalString);
    // });
    // console.log(response.data.extendedIngredients[0].originalString);
    // console.log(recipe);
    listRecipes.push(response.data);
    // console.log(listRecipes);
  }).catch(function (error) {
    console.error(error);
  });
}

// console.log("test " + findRecipe(ingredient));

// var ingredients = 'apples,flour,sugar'

// findRecipe(ingredients);

module.exports = router;