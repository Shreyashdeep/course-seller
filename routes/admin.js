const {Router} =require("express");
const adminRouter=Router(); 
adminRouter.post("/signup", function(req, res){

})
adminRouter.post("/signin", function(req, res){

})
adminRouter.post("/createCourse", function(req, res){

})
adminRouter.put("/course", function(req, res){

})
adminRouter.get("/bulk", function(req, res){

})

module.exports={
    adminRouter: adminRouter
}