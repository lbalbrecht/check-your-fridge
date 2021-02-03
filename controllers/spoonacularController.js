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

module.exports = router;