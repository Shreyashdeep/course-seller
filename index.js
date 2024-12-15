const express=require("express");
const jwt= require("jsonwebtoken")
const mongoose=require("mongoose");
require('dotenv').config();
const {createUserRoutes} = require("./routes/user")
const {createCourseRoutes}= require("./routes/course")

const app= express();
app.use(express.json());
mongoose.connect(process.env.MONGO_URI)


app.post("/admin/signup", function(req, res){

})
app.post("/admin/login", function(req, res){

})
app.post("/admin/createCourse", function(req, res){

})
app.post("/admin/deleteCourse", function(req, res){

})
app.post("/admin/addCourseContent", function(req, res){

})


app.listen(3000);