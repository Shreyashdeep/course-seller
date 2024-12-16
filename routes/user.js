import { Router } from "express";
const userRouter= Router();
import { userModel } from "../db.js";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const JWT_USER_PASSWORD= "shreyash"

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
userRouter.get("/purchasedCourse", function(req, res){
    
})

export {userRouter};