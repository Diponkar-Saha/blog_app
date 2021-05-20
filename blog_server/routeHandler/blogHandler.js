const express = require("express");
const mongoose = require("mongoose");
//const { route } = require("../../blog_server/routeHandler/todoHandler");
const blogSchema=require('../schemas/blogSchema')
const router = express.Router();

const Blog= new mongoose.model("Blog",blogSchema);

//get 
router.get("/:username", async (req,res)=>{
 
    try {
      const data=await Blog.find(
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
router.get("/:username", (req,res)=>{

  Blog.findOne(
    {username: req.params.username},(err,data)=>{
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
      //  result:data,
        message: "Success", 
      });
    }
    // if(result==null){

    // }

  })

});

//delete user
router.delete("/delete/:username",  (req,res)=>{

   Blog.deleteOne(
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

  Blog.findOneAndUpdate(
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

  Blog.updateOne(
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
        username:req.params.username,
      });
    }

  })

});

//post multiple 
router.post("/post_all", (req,res)=>{

  Blog.insertMany(req.body,(err)=>{
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

//post signup
router.post('/regis', (req,res)=>{
    console.log("registration start");

    const newBlog =new Blog(req.body);
     newBlog.save((err)=>{
        if (err) {
            res.status(500).json({
              error: "There was a server side error!",
            });
          } else {
            res.status(200).json({
             
              message: " Reg Success",
              
            });
          }
    })



});
module.exports=router;
