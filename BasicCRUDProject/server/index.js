/*
Project: Moments Application
File Description: This file is the starting point for 
        the server it's responsible for connecting to 
        the DB and starting the port
Owner: Jibu Jacob
*/

//Setting up packages to be imported
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

//Import Custom packages 
import postroutes from "./routes/posts.js";

//Initializing the pacakges to be utilized
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json({limit:"30mb",extended:true}));
app.use(cors());
dotenv.config();
app.use("/posts",postroutes);

//Setting up Mongo DB Connections
const connectionURL= process.env.MONGO_DB_URL
//Setting the port setting env piece for deployment purpose
const port = process.env.PORT;

//Connecting to Mongoose Database
mongoose.connect(connectionURL)
    .then(() => app.listen(port,() => console.log("Server started successfully on port:"+port)))
    .catch((error) => console.log(error.message));

