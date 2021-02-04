require('dotenv').config()
const express = require("express");
const router = express.Router();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

router.post("/", (req, res) => {
    console.log(req.body.phoneNumber)
    console.log(req.body.list);
    // findRecipe(req.body.searchIngredients, res)
    
    sendMessage(req.body.phoneNumber, req.body.list)
})


function sendMessage(phoneNumber, ingredients){

    client.messages.create({
        to: `+1${phoneNumber}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        body: ingredients.replace(/\|/g, "\n")
    }).then((message) => console.log(message.sid))
}
// console.log("testtoday");

//     client.messages.create({
//         to: `+14258027715`,
//         from: process.env.TWILIO_PHONE_NUMBER,
//         body: "ingredients"
//     }).then((message) => console.log(message.sid))


module.exports = router;