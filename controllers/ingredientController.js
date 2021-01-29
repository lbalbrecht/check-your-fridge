const express = require("express");
// const sequelize = require("sequelize");

const router = express.Router();

const db = require("../models");
const bcrypt = require("bcrypt");

// route for login page

// route for user home page
router.get("/ingredients", function (req, res) {
    db.Ingredient.findAll({
        order: sequelize.col("expiration")
    })
        .then(function (dbIngredient) {
            console.log(dbIngredient);
            const dbIngredientsJson = dbIngredient.map(ingredient => ingredient.toJSON());
            const hbsObject = { ingredient: dbIngredientsJson };
            return res.render("home", hbsObject);
        }).catch(err => {
            console.log(err.message);
            res.status(500).send(err.message)
        })
});

// route for creating new ingredient
router.post("/ingredients/create", function (req, res) {
    db.Ingredient.create({
        name: req.body.name,
        expiration: req.body.expiration,
        category: req.body.category
    }).then(function (dbIngredient) {
        console.log(dbIngredient);
        const dbIngredientsJson = dbIngredient.toJSON();
        const hbsObject = { ingredient: dbIngredientsJson };
        return res.set("home", hbsObject)
    }).catch(err => {
        console.log(err.message);
        res.status(500).send(err.message)
    })
});

// route to delete ingredient
app.delete("/ingredients/:id", function (req, res) {
    db.Ingredient.destroy({
        where: {
            id: req.params.id
        }
    }).then(function (dbIngredient) {
        console.log(`Removed ${dbIngredient} from your fridge.`);
        res.status(200);
    }).catch(err => {
        console.log(err.message);
        res.status(500).send(err.message)
    })
});

module.exports = router;