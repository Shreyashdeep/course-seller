import { Router } from "express";
const courseRouter= Router();

courseRouter.post("/purchase", function(req, res){
    res.json({
        message: " signup endpoint"
    })
    
})
courseRouter.get("/preview", function(req, res){
    res.json({
        message: "course preview endpoint"
    })

})

export {courseRouter};