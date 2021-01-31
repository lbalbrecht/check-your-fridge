const express = require("express");
// const sequelize = require("sequelize");

const router = express.Router();

const db = require("../models");
// const bcrypt = require("bcrypt");

// INGREDIENT ROUTES
// all routed start with /api/ingredients b/c of command in serve.js file
// route for all ingredients
router.get("/", (req, res) => {
    // res.send("All ingredients")
    db.Ingredient.findAll().then(data => {
        res.json(data)
    }).catch(err => {
        res.status(500).json(err)
    })
})


// router.get("/category/:id", (req,res)=>{
//     db.Category.findOne({
//         where:{
//             id:req.params.id
//         },
//         include:[db.Category]
//     }).then(data=>{
//         res.json(data)
//     }).catch(err=>{
//         res.status(500).json(err)
//     })
// })

// route for user ingredients
router.get("/myingredients", (req, res)=>{
    if(!req.session.user){
        res.status(401).send("Not logged in")
    } else{
        db.Ingredient.findAll({
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

// route to add new ingredient
router.post("/", (req, res) => {
    if (!req.session.user) {
        res.status(401).send("not logged in")
    } else {
        db.Ingredient.create({
            name: req.body.name,
            expiration: req.body.date,
            category: req.body.expiration,
            UserId: req.session.user.id
        }).then(data=>{
            res.json(data)
        }).catch(err => {
            res.status(500).json(err)
        })
    }

})


module.exports = router;