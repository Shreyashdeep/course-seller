import express, { json } from "express";
import jwt from "jsonwebtoken";
import 'dotenv/config'
import { userRouter } from "./routes/user.js";
import { courseRouter } from "./routes/course.js";
import { adminRouter } from "./routes/admin.js";
import mongoose from "mongoose";

// Destructure Schema and ObjectId for ease of use
const { Schema, Types: { ObjectId } } = mongoose;

const app= express();
app.use(json());
app.use("/api/v1/user",userRouter);
app.use("/api/v1/course",courseRouter);
app.use("/api/v1/admin",adminRouter);


async function main() {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(3000);
}

main()