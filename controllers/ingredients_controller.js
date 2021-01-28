const express = require("express");

const router = express.Router();

const db = require("../models");

// route for login page

// route for user home page
router.get("/ingredients", function (req, res) {

    db.Ingredient.findAll()

        .then(function (dbIngredient) {
            console.log(dbIngredient);
            const dbIngredientsJson = dbIngredient.map(ingredient => ingredient.toJSON());
            var hbsObject = { ingredient: dbIngredientsJson };
            return res.render("home", hbsObject);
        });
});

// route for creating new ingredient


// route to search for recipes

// route for saved recipes