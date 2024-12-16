import { Router } from "express";
const userRouter= Router();
import { userModel } from "../db.js";
import { z } from "zod";
import bcrypt from "bcrypt";

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
userRouter.post("/signin", function(req, res){
    res.json({
        message: "signin endpoint"
    })

})
userRouter.get("/purchasedCourse", function(req, res){
    
})

export {userRouter};