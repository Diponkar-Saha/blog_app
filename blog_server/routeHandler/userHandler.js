const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
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

//post signup
router.post('/user/signup', async(req,res)=>{
  try {
    console.log("registration start");
    const hashedPassword=await bcrypt.hash(req.body.password,10);
    const newUser =new User({
      username : req.body.username,
      password : hashedPassword,
      email : req.body.email,
    });
    await newUser.save()

    res.status(200).json({
      message: "save success",
    });
    }catch (error) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    }
 
});

// LOGIN
router.post("/user/login", async(req, res) => {
  try {
      const user = await User.find({ username: req.body.username });
      if(user && user.length > 0) {
          const isValidPassword = await bcrypt.compare(req.body.password, user[0].password);

          if(isValidPassword) {
              // generate token
              const token = jwt.sign({
                  username: user[0].username,
                  userId: user[0]._id,
              }, process.env.JWT_SECRET, {
                  expiresIn: '1h'
              });

              res.status(200).json({
                  "access_token": token,
                  "message": "Login successful!"
              });
          } else {
              res.status(401).json({
                  "error": "Authetication failed!"
              });
          }
      } else {
          res.status(401).json({
              "error": "Authetication failed!"
          });
      }
  } catch {
      res.status(401).json({
          "error": "Authetication failed!"
      });
  }
});
module.exports=router;
