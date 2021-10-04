/*
Project: Moments Application
File Description: This file is the react Posts component which
        encompasses all necessary UI components
Owner: Jibu Jacob
*/

//Import packages needed for this the App component
import React from "react";
import {Grid,CircularProgress} from "@material-ui/core";
import { useSelector } from "react-redux"; 

//Import custom packages needed for this the App component
import Post from "./Post/Post.js"
import useStyles from "./styles";

function Posts({setCurrentId}){
    const styleClasses = useStyles();
    const posts = useSelector((state) => state.posts);
    console.log(posts);
    return (
        !posts.length ? <CircularProgress /> : (
            <Grid className = { styleClasses.mainContainer} container alignItems="stretch" spacing={3} >
                {posts.map((post) => (
                    <Grid key={post._id} item xs={12} sm={6}>
                        <Post post={post} setCurrentId={setCurrentId}/>
                    </Grid>
                ))}
            </Grid>
        )
    );
}

export default Posts;