import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Auth from '../auth/Auth';
import RandomComic from '../shelf/RandomComic';
import ShelfIndex from '../shelf/ShelfIndex';
import Sitebar from './Sitebar'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch, 
    useHistory
} from 'react-router-dom';
import SearchPage from '../search/SearchPage';


//FUNCTIONS
const SplashPage = (props) => {
const {
    buttonLabel,
    className
} = props;


//STYLE

const splashpageStyle = 
{
    fontFamily: "Comic Sans"
}

return (
    <div >          
            {(!localStorage.getItem('token')) 
            ? <RandomComic setAuthModal={props.setModal}/> 
            : <ShelfIndex  token={props.token}/>}
    </div>
);
}

export default SplashPage;