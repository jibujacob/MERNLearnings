/*
Project: Moments Application
File Description: This file is the react Post component which
        encompasses all necessary UI components
Owner: Jibu Jacob
*/

//Import packages needed for this the App component
import React from "react";
import {Card, CardActions, CardContent, CardMedia ,Button ,Typography} from "@material-ui/core";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from "moment";
import { useDispatch } from "react-redux";
import { deletePosts ,likePosts} from "../../../actions/posts";


//Import custom packages needed for this the App component
import useStyles from "./styles";

function Post({post,setCurrentId}){
    const styleClasses = useStyles();
    const dispatch = useDispatch();

    return (
        <Card className={styleClasses.card}>
            <CardMedia className={styleClasses.media} image={post.selectedFile} title ={post.title}/>
            <div className={styleClasses.overlay}>
                <Typography variant="h6">{post.creator}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={styleClasses.overlay2}>
                <Button 
                    style={{color:"white"}} 
                    size="small" 
                    onClick={() => {setCurrentId(post._id)}} >
                        <MoreHorizIcon fontSize="medium" />
                </Button>
            </div>
            <div className={styleClasses.details}>
                <Typography variant="body2" color="textSecondary" >{post.tags.map((tag)=> `#${tag} `)}</Typography>
            </div>
            <Typography className={styleClasses.title} variant="h5" gutterBottom >{post.title}</Typography>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p" >{post.message}</Typography>
            </CardContent>
            <CardActions className={styleClasses.cardActions}>
                <Button size="small" color="primary" onClick={()=>{dispatch(likePosts(post._id))}}>
                    <ThumbUpAltIcon fontSize="small"/> &nbsp; Like &nbsp; {post.likeCount}
                </Button>
                <Button size="small" color="primary" onClick={()=>{dispatch(deletePosts(post._id))}}>
                    <DeleteIcon fontSize="small"/> Delete
                </Button>
            </CardActions>
        </Card>

    );
}

export default Post;