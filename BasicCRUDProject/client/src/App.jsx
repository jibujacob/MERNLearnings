/*
Project: Moments Application
File Description: This file is the react App component which
        encompasses all other UI components
Owner: Jibu Jacob
*/

//Import packages needed for this the App component
import React,{useState,useEffect} from "react";
import {Container, AppBar, Typography, Grow, Grid} from "@material-ui/core";
import { useDispatch } from "react-redux";

//Import custom packages needed for this the App component
import moments from "./images/moments.png";
import Posts from "./components/Posts/Posts.js";
import Form from "./components/Form/Form.js";
import useStyles from "./styles";
import {getPosts} from "./actions/posts.js";

function App(){
    const styleClasses = useStyles();
    const dispatch = useDispatch();
    const [currentId,setCurrentId] = useState();

    useEffect(() => {
        dispatch(getPosts());
    },[currentId,dispatch]);

    return (
        <Container maxWidth="lg">
            <AppBar className={styleClasses.appBar} position="static" color="inherit">
                <Typography className={styleClasses.heading} variant="h2" align="center">Moments</Typography>
                <img className={styleClasses.image} src = {moments} alt="moments" height="60" />
            </AppBar>
            <Grow in>
                <Container>
                    <Grid className={styleClasses.mobileConfig} container justifyContent="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts setCurrentId={setCurrentId}/>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form currentId={currentId} setCurrentId={setCurrentId}/>
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    );
}

export default App;