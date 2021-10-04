/*
Project: Moments Application
File Description: This file is responsible for the  API 
        component 
Owner: Jibu Jacob
*/

//Import packages needed for this the App component
import axios from "axios";

const url = "http://localhost:5000/posts";

export const fetchPosts = () => axios.get(url);
export const createPosts = (newPost) => axios.post(url,newPost);
export const updatePosts = (currentId,updatedPost) => axios.patch(`${url}/${currentId}`,updatedPost);
export const deletePosts = (currentId) => axios.delete(`${url}/${currentId}`);
export const likePosts = (currentId) => axios.patch(`${url}/${currentId}/likePost`);
