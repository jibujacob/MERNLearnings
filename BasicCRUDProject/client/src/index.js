/*
Project: Moments Application
File Description: This file is the starting point for react App 
        component which encompasses all other UI components
Owner: Jibu Jacob
*/

//Import packages needed for this the App component
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from "./reducers/index.js";

//Import custom packages needed for this the App component
import App from "./App";
import "./index.css";

const store = createStore(reducers,compose(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store = {store}>
        <App />
    </Provider>
    ,document.getElementById("root")
);