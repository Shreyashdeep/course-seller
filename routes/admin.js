import { Router } from "express";
const adminRouter=Router(); 
import { adminModel } from "../db.js";
adminRouter.post("/signup", function(req, res){

})
adminRouter.post("/signin", function(req, res){

})
adminRouter.post("/course", function(req, res){

})
adminRouter.put("/course", function(req, res){

})
adminRouter.get("/course/bulk", function(req, res){

})

export {adminRouter};