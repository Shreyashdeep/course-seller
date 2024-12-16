import { Router } from "express";
const adminRouter=Router(); 
import { adminModel } from "../db.js";
import bcrypt from "bcrypt";
import {z} from 'zod';
import jwt from "jsonwebtoken";
const JWT_ADMIN_PASSWORD= "deep122334"

adminRouter.post("/signup", async function(req, res){
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
    await adminModel.create({
        email: email,
        password: hashedPassword,
        firstName: firstName,
        lastName: lastName
    })
    res.json({
        message: "you are signed up"
    })


})
adminRouter.post("/signin", async function(req, res){
    const {email, password}= req.body;
    // how to check hashed password matches or not
    const admin= await adminModel.findOne({
        email: email
    })
    if (admin) {
        // Compare the plain-text password with the hashed password in the database
        bcrypt.compare(password, admin.password, (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Internal server error" });
            }

            if (result) {
                // Password matches, generate JWT token
                const token = jwt.sign(
                    { id: admin._id },
                    JWT_ADMIN_PASSWORD);
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
adminRouter.post("/course", function(req, res){

})
adminRouter.put("/course", function(req, res){

})
adminRouter.get("/course/bulk", function(req, res){

})

export {adminRouter};