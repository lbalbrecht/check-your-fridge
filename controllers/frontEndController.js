const express = require("express");
const router = express.Router();
const db = require("../models");

// route for home page
router.get("/", (req,res)=>{
    db.Ingredient.findAll({
        include: [db.User]
    }).then(data=>{
        const jsonData = data.map(obj=>{
            const jsonObj = obj.toJSON()
            if(req.session.user){
                jsonObj.isMine = req.session.user.id===jsonObj.UserId
            } else{
                jsonObj.isMine = false;
            }
            return jsonObj
        })
        const hbsObj = {
            ingredients:jsonData,
            user:req.session.user
        }
        console.log(jsonData)
        res.render("home", hbsObj)
    })
})

router.get('/login',(req,res)=>{
    // res.render("login")
    res.render('login',{
        user:req.session.user
    })
})

router.get('/signup',(req,res)=>{
    // res.render("signup")
    res.render('signup',{
        user:req.session.user
    })
})

router.get('/add',(req,res)=>{
    if(!req.session.user){
        res.redirect('/login')
    } else{
        
        // res.render("add")
        res.render('add',{
            user:req.session.user
        })
    }
})


router.get("/recipes", (req,res)=>{
    db.Recipe.findAll({
        include: [db.User]
    }).then(data=>{
        const jsonData = data.map(obj=>{
            const jsonObj = obj.toJSON()
            if(req.session.user){
                jsonObj.isMine = req.session.user.id===jsonObj.UserId
            } else{
                jsonObj.isMine = false;
            }
            return jsonObj
        })
        const hbsObj = {
            recipes:jsonData,
            user:req.session.user
        }
        console.log(jsonData)
        res.render("recipes", hbsObj)
    })
})

module.exports = router;