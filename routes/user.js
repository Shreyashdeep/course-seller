function createUserRoutes(app){
    app.post("/user/signup", function(req, res){
        const email= req.body.email;
        const password= req.body.password;
        const name= req.body.name;
    
    
        res.json({
            message: "signup endpoint"
        })
    
        
    })
    app.post("/user/signin", function(req, res){
        res.json({
            message: "signin endpoint"
        })
    
    })
    app.get("/user/purchasedCourse", function(req, res){
        
    })
}

module.exports={
    createUserRoutes: createUserRoutes
}