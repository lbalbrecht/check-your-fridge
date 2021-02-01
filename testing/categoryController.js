// const express = require("express");
// const router = express.Router();
// const db = require("../models");

// router.get("/", (req,res)=>{
//     db.Category.findAll({
//         include:[db.Ingredient]
//     }).then(data=>{
//         res.json(data)
//     }).catch(err=>{
//         res.status(500).json(err)
//     })
// })

// router.post("/", (req, res)=>{
//     if(!req.session.user){
//         res.status(401).send("Not logged in")
//     } else{
//         db.Category.create({
//             name:req.body.name
//         }).then(data=>{
//             res.json(data)
//         }).catch(err=>{
//             res.status(500).json(err)
//         })
//     }
// })

// module.exports = router;