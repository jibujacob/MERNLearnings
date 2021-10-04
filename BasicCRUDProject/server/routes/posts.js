/*
Project: Moments Application
File Description: This file is responsible to maintain 
            all the possible routes in this application
Owner: Jibu Jacob
*/

//Import pacakges needed for the application
import express from "express";

//Import custom packages for the application
import { getPosts ,createPosts, updatePosts, deletePosts,likePosts} from "../controllers/posts.js";

//Initialize the router function
const router = express.Router();

//Get route to fetch all the posts 
router.get("/", getPosts);
//Post route to create a post
router.post("/", createPosts);
router.patch("/:id", updatePosts);
router.delete("/:id", deletePosts);
router.patch("/:id/likePost", likePosts);

export default router;