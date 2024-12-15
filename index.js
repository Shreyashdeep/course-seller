const express=require("express");
const jwt= require("jsonwebtoken")
const mongoose=require("mongoose");
require('dotenv').config();
const { userRouter} = require("./routes/user")
const { courseRouter}= require("./routes/course");
const { adminRouter } = require("./routes/admin");

const app= express();
app.use(express.json());
mongoose.connect(process.env.MONGO_URI);
app.use("/api/v1/user",userRouter);
app.use("/api/v1/course",courseRouter);
app.use("/api/v1/admin",adminRouter);




app.listen(3001);