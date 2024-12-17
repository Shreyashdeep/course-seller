import { Router } from "express";
const courseRouter= Router();
import { userMiddleware } from "../middleware/user.js";
import { courseModel, purchaseModel } from "../db.js";

courseRouter.post("/purchase",userMiddleware,async function(req, res){
    const userId= req.userId;
    const courseId= req.body.courseId;

    await purchaseModel.create({
        userId,
        courseId
    })
    res.json({
        message: " you have successfully bought the course"
    })
    
})
courseRouter.get("/preview", async function(req, res){
    const courses= await courseModel.find({})
    res.json({
        courses
    })

})

export {courseRouter};