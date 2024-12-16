import express, { json } from "express";
import jwt from "jsonwebtoken";
// require('dotenv').config();
import { userRouter } from "./routes/user.js";
import { courseRouter } from "./routes/course.js";
import { adminRouter } from "./routes/admin.js";
import mongoose from "mongoose";

// Destructure Schema and ObjectId for ease of use
const { Schema, Types: { ObjectId } } = mongoose;

const app= express();
app.use(json());
mongoose.connect("mongodb+srv://shreyashdeep20:tflPUrug0pfD57ra@cluster0.zzydh.mongodb.net/course-selling-app-database");
app.use("/api/v1/user",userRouter);
app.use("/api/v1/course",courseRouter);
app.use("/api/v1/admin",adminRouter);


async function main() {
    await mongoose.connect("mongodb+srv://shreyashdeep20:tflPUrug0pfD57ra@cluster0.zzydh.mongodb.net/course-selling-app-database");
    app.listen(3000);
}

main()