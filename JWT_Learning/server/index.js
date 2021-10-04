import express from "express";
import jwt from "jsonwebtoken";

import { users } from "./dummydata.js";

const app=express();
app.use(express.json());

app.get("/", (req,res) => {
    res.send("Let's Learn JWT");
});

let refreshTokens = [];

app.post("/api/refresh", (req,res) => {
    const refreshToken = req.body.token;
   
    if (!refreshToken) return res.status(401).json({message: "You are not authenticated"});
    if (!refreshTokens.includes(refreshToken)) return res.status(403).json("Refresh token is not valid!")

    if (jwt.verify(refreshToken,"myRefreshSecretKey" ,(err,user) => {
        if(err){
            console.log(err);
        }
        console.log(user);
        refreshTokens=refreshTokens.filter((token) => token !== refreshToken);
        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);

        refreshTokens.push(newRefreshToken);

        res.status(200).json({
            accessToken:newAccessToken,
            refreshToken:newRefreshToken
        });
    }));

});

const generateAccessToken = user => {
    return jwt.sign({id:user.id , isAdmin:user.isAdmin},"mySecretKey",
        {expiresIn:"30s"});
}

const generateRefreshToken = user => {
    return jwt.sign({id:user.id , isAdmin:user.isAdmin},"myRefreshSecretKey");
}

app.post("/api/login",(req,res) => {
    const {username,password} = req.body;
    const user = users.find(u => {return u.username === username && u.password === password});
    
    if (user){
        // res.json(user);
        //Generate a JWT
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        
        refreshTokens.push(refreshToken);

        res.json({
            username : user.username,
            isAdmin : user.isAdmin,
            accessToken,
            refreshToken
        });
    }else{
        res.status(400).json({message : "Username or password incorrect"});
    }
});



const verify = (req,res,next) => {
    const authHeader = req.headers.authorization;

    if (authHeader){
        const token = authHeader.split(" ")[1];
        
        jwt.verify(token,"mySecretKey",(err,user) => {
            if (err) {
               return res.status(403).json({message : "Token not valid"});
            }

            req.user = user;
            next();
        })
    }else{
        res.status(401).json({message : "User not authenticated"});
    }
}

app.delete("/api/users/:userId",verify, (req,res) => {

    if(req.user.id === req.params.userId || req.user.isAdmin ){
        res.status(200).json({message: "User has been deleted"});
    }else{
        res.status(403).json({message : "User not allowed to delete users"});
    }

});

app.post("/api/logout",verify,(req,res)=>{
    const refreshToken = req.body.token;
    refreshTokens=refreshTokens.filter((token) => token !=refreshToken);
    res.status(200).send("You logged out successfully");
})

app.listen(5000,() => console.log("Server Running on port 5000"));