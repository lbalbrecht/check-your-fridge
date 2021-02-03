const express = require("express");
// const sequelize = require("sequelize");
const router = express.Router();
const db = require("../models");

// Recipe Route
// all routed start with /api/recipe b/c of command in serve.js file
// route for all recipe
router.get("/", (req, res) => {
    // res.send("All recipes")
    db.Recipe.findAll().then(data => {
        res.json(data)
    }).catch(err => {
        res.status(500).json(err)
    })
})


router.get("/myrecipes", (req, res)=>{
    if(!req.session.user){
        res.status(401).send("Not logged in")
    } else{
        db.Recipe.findAll({
            where:{
                UserId:req.session.user.id
            }
        }).then(data=>{
            res.json(data)
        }).catch(err=>{
            res.status(500).json(err)
        })
    }
})

// route to add new recipe
router.post("/", (req, res) => {
    if (!req.session.user) {
        res.status(401).send("not logged in")
    } else {
        db.Recipe.create({
            title: req.body.title,
            url: req.body.url,
            summary: req.body.summary,
            instructions: req.body.instructions,
            ingredients: req.body.ingredients,
            UserId: req.session.user.id
        }).then(data=>{
            res.json(data)
        }).catch(err => {
            res.status(500).json(err)
        })
    }

})

module.exports = router;