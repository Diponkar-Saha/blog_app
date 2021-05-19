const express = require("express");
const mongoose = require("mongoose");
//const { route } = require("../../blog_server/routeHandler/todoHandler");
const userSchema=require('../schemas/userSchema')
const router = express.Router();

const User= new mongoose.model("User",userSchema);

//get all
router.get("/:username", async (req,res)=>{

  await User.find(
    {username: req.params.username},(err,data)=>{
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        result:data,
        message: "Success", 
      });
    }

  })

});

//delete user
router.delete("/:username", async (req,res)=>{

  await User.deleteOne(
    {username: req.params.username},(err)=>{
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
       
        message: "user delete", 
      });
    }

  })

});

//put
router.put("/:username", async (req,res)=>{

  await User.updateOne(
    {username: req.params.username},{
    $set:{
      password:'12'
    }
  },(err)=>{
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "Updated Success", 
      });
    }

  })

});

//post multiple 
router.post("/post_all", async (req,res)=>{

  await User.insertMany(req.body,(err)=>{
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "Many post were inserted Success", 
      });
    }
  })
  

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
