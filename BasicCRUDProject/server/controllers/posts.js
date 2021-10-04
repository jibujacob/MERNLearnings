/*
Project: Moments Application
File Description: This file is responsible to maintain all
        the logics of the routes in this application
Owner: Jibu Jacob
*/

//Import the necessary packages
import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

//logic written for getting the message for route ("/")
export const getPosts = async (req,res) => {
    
    try {
        const postMessage = await PostMessage.find();
        res.status(200).json(postMessage);
    } catch (error) {
        res.status(404).json({message: error.message});
    }

}

//logic written for posting the message for route ("/")
export const createPosts = async (req,res) => {
    
    const post = req.body;
    const newPost = new PostMessage(post);

    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({message: error.message});
    }

}

export const updatePosts = async (req,res) => {
    const {id:_id} = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return req.status(404).send({message:"No post with that id"});

    const updatedPost = await PostMessage.findByIdAndUpdate(_id,{... post,_id},{new:true});
    res.json(updatedPost);
}

export const deletePosts = async (req,res) => {
    const {id:_id} = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return req.status(404).send({message:"No post with that id"});

    await PostMessage.findByIdAndDelete(_id);
    res.json({message:"Post Successfully Deleted"});
}

export const likePosts = async (req,res) => {
    const {id:_id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id)) return req.status(404).send({message:"No post with that id"});

    const findPost = await PostMessage.findById(_id);
    const updatedPost = await PostMessage.findByIdAndUpdate(_id,{likeCount:findPost.likeCount+1},{new:true});

    res.json(updatedPost);
}
