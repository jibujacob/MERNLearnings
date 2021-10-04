/*
Project: Moments Application
File Description: This file is the react Form component which
        encompasses all necessary UI components
Owner: Jibu Jacob
*/

//Import packages needed for this the App component
import React,{useState,useEffect} from "react";
import {TextField, Button, Typography, Paper} from "@material-ui/core";
import FileBase from "react-file-base64";

//Import custom packages needed for this the App component
import useStyles from "./styles";
import { useDispatch,useSelector} from "react-redux";
import {createPosts,updatePosts} from "../../actions/posts.js"



function Form({currentId,setCurrentId}){
    const styleClasses = useStyles();
    const dispatch = useDispatch();
    const updatedPosts = useSelector((state) => currentId ? state.posts.find((p) => p._id===currentId): null);

    useEffect(() => {
        if(updatedPosts) setPostData(updatedPosts);
    } ,[updatedPosts])
    
    const clear = () => {
        setCurrentId(null);
        setPostData({
            title : "",
            message  : "",
            creator : "",
            tags: "",
            selectedFile : "",
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (currentId){
            dispatch(updatePosts(currentId,postData));
        }else{
            dispatch(createPosts(postData));
        }
        clear();
    }

    const [postData, setPostData] = useState({
        title : "",
        message  : "",
        creator : "",
        tags: "",
        selectedFile : "",
    });

    return (
        <Paper className={styleClasses.paper}>
            <form className={`${styleClasses.root} ${styleClasses.form}`}
                autoComplete="off" 
                noValidate 
                onSubmit={handleSubmit}>
                <Typography variant="h6"> {currentId ? 'Updating' : 'Creating' } a Moment</Typography>
                <TextField 
                    name="creator"
                    variant="outlined"
                    label="Creator"
                    fullWidth
                    value={postData.creator}
                    onChange={(event) => setPostData({...postData,creator:event.target.value})}
                />
                <TextField 
                    name="title"
                    variant="outlined"
                    label="Title"
                    fullWidth
                    value={postData.title}
                    onChange={(event) => setPostData({...postData,title:event.target.value})}
                />
                <TextField 
                    name="message"
                    variant="outlined"
                    label="Message"
                    fullWidth
                    value={postData.message}
                    onChange={(event) => setPostData({...postData,message:event.target.value})}
                />
                <TextField 
                    name="tags"
                    variant="outlined"
                    label="Tags"
                    fullWidth
                    value={postData.tags}
                    onChange={(event) => setPostData({...postData,tags:event.target.value.split(',')})}
                />
                <div className={styleClasses.fileInput}>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({base64}) => setPostData({...postData,selectedFile:base64})}

                    />
                </div>
                <Button className={styleClasses.buttonSubmit} 
                    variant="contained" 
                    color="primary"
                    size="large"
                    type="submit"
                    fullWidth>Submit</Button>
                <Button 
                    variant="contained" 
                    color="secondary"
                    size="small"
                    onClick={clear}
                    fullWidth>Clear</Button>

            </form>

        </Paper>
    );
}

export default Form;