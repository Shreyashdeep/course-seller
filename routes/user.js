import { Router } from "express";
const userRouter= Router();
import { courseModel, purchaseModel, userModel } from "../db.js";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_USER_PASSWORD } from "../config.js";
import { userMiddleware } from "../middleware/user.js";

userRouter.post("/signup",async function(req, res){
    const requireBody= z.object({
        email: z.string().min(3).max(100).email(),
        password: z.string().min(3).max(30),
        firstName: z.string().min(3).max(100),
        lastName: z.string().min(3).max(100)
    })
    const parsedDataWithSuccess= requireBody.safeParse(req.body);
    if(!parsedDataWithSuccess){
        res.json({
            message: "incorrect format of the signin details"
        })
        return
    }

    const {email, password , lastName, firstName}= req.body;
    const hashedPassword= await bcrypt.hash(password, 5);
    
    console.log(hashedPassword);
    await userModel.create({
        email: email,
        password: hashedPassword,
        firstName: firstName,
        lastName: lastName
    })
    res.json({
        message: "you are signed up"
    })


    
})
userRouter.post("/signin", async function(req, res){
    const {email, password}= req.body;
    // how to check hashed password matches or not
    const user= await userModel.findOne({
        email: email
    })
    if (user) {
        // Compare the plain-text password with the hashed password in the database
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Internal server error" });
            }

            if (result) {
                // Password matches, generate JWT token
                const token = jwt.sign(
                    { id: user._id },
                    JWT_USER_PASSWORD);
                return res.json({ token });
            } else {
                // Password does not match
                return res.status(403).json({ message: "Incorrect credentials" });
            }
        });}else{

        res.status(403).json({
            message: "incorrect credentials"
        })
    }

})
userRouter.get("/purchases",userMiddleware, async function(req, res){
    const userId= req.userId;
    const purchases= await purchaseModel.find({
        userId
    })
    const courseData= await courseModel.find({
        _id:{$in: purchases.map(x=> x.courseId)}
    })
    res.json({
        purchases,
        cour
    })
    
})

export {userRouter};