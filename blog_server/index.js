const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const blogHandler=require("./routeHandler/blogHandler");
const userHandler=require("./routeHandler/userHandler");

//express ap init
const app=express()
app.use(express.json())
dotenv.config()
//database
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("connection successfull"))
.catch(err => console.log(err));




//application route
app.use("/blog",blogHandler);
app.use("/user",userHandler);


// default error handler
function errorHandler(err, req, res, next) {
    if (res.headersSent) {
      return next(err);
    }
    res.status(500).json({ error: err });
  }

  app.listen(3000, () => {
    console.log("app listening at port 3000");
  });