/*
Project: Moments Application
File Description: This file is the react style component
        for the App Component
Owner: Jibu Jacob
*/

//Import packages needed for this the App component
import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    appBar: {
      borderRadius: 15,
      margin: '30px 0',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    heading: {
      color: 'rgba(0,183,255, 1)',
    },
    image: {
      marginLeft: '15px',
    },
    [theme.breakpoints.down('sm')]:{
      mobileConfig:{
        flexDirection:"column-reverse"
       }
    }
    
  }));