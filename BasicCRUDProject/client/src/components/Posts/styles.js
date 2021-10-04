/*
Project: Moments Application
File Description: This file is the react style component
        for the Posts Component
Owner: Jibu Jacob
*/

//Import packages needed for this the App component
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: 'center',
  },
}));