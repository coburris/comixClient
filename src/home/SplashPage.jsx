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
} from 'react-router-dom';
import SearchPage from '../search/SearchPage';
import {
    Collapse,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    Nav, 
} from 'reactstrap';
import Footer from './Footer'



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
    <div>  
            {(!localStorage.getItem('token'))
            ?
        <div>
            <blockquote className= 'speech-bubble2'>Welcome! Search the largest Comic book inventory and create your shelf to start reading!</blockquote>
            <img className="superman" src="/images/superman.png" alt="Superman"></img>
        </div>
            :null}
            {(!localStorage.getItem('token')) 
            ? <RandomComic  setAuthModal={props.setModal}/> 
            : <ShelfIndex  token={props.token}/>}
    </div>
);
}

export default SplashPage;