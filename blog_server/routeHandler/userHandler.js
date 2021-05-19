const express = require("express");
const mongoose = require("mongoose");
//const { route } = require("../../blog_server/routeHandler/todoHandler");
const userSchema=require('../schemas/userSchema')
const router = express.Router();

const User= new mongoose.model("User",userSchema);

//get 
router.get("/:username", async (req,res)=>{
 
    try {
      const data=await User.find(
        {username: req.params.username});
      res.status(200).json({
        result:data,
        message: "Success", 
      });
      
    } catch (error) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    }
  

});

//login
router.post("/:username", (req,res)=>{

  User.findOne(
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
    if(result==null){

    }

  })

});

//delete user
router.delete("/delete/:username",  (req,res)=>{

   User.deleteOne(
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

//patch user
router.patch("/pupdate/:username", (req,res)=>{

  User.findOneAndUpdate(
    {username: req.params.username},{
      $set:{
        //password:'12'
        password:req.body.password
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

//put or update
router.put("/update/:username", (req,res)=>{

  User.updateOne(
    {username: req.params.username},{
    $set:{
      //password:'12'
      password:req.body.password
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
router.post("/post_all", (req,res)=>{

  User.insertMany(req.body,(err)=>{
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
router.post('/registration', (req,res)=>{
    console.log("registration start");

    const newUser =new User(req.body);
     newUser.save((err)=>{
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
