const {Router}=require("express");
const userRouter= Router();
userRouter.post("/signup", function(req, res){
    const email= req.body.email;
    const password= req.body.password;
    const name= req.body.name;


    res.json({
        message: "signup endpoint"
    })

    
})
userRouter.post("/signin", function(req, res){
    res.json({
        message: "signin endpoint"
    })

})
userRouter.get("/purchasedCourse", function(req, res){
    
})

module.exports={
    userRouter: userRouter
}