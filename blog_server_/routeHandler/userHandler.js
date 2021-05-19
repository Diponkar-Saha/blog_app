const express = require("express");
const mongoose = require("mongoose");
//const { route } = require("../../blog_server/routeHandler/todoHandler");
const userSchema=require('../schemas/userSchema')
const router = express.Router();

const User= new mongoose.model("User",userSchema);

//get all
router.get("/registration", async (req,res)=>{

  console.log("het ");

});

//post login
router.post('/registration', async (req,res)=>{
    console.log("registration start");

    const newUser =new User(req.body);
    await newUser.save((err)=>{
        if (err) {
            res.status(500).json({
              error: "There was a server side error!",
            });
          } else {
            res.status(200).json({
             
              message: "Success",
              
            });
          }
    })



});
module.exports=router;
