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

<<<<<<< HEAD
const [modal, setModal] = useState(false);
const [isOpen, setIsOpen] = useState(false);
    
    
    const toggleNav = () => {
        let newIsOpen = !isOpen;
        setIsOpen(newIsOpen); 
    }

const toggle = () => 

    {
        console.log("Trigger toggle")
        setModal(!modal);

    }

//STYLE

const modalStyle =
{
    width: "498px",
    
}

const sitebarStyle = {
        backgroundColor: '#fc1621',
        position: 'relative',
        border: 'solid #FFEB00',
        borderRadius: '10px',
        height: '120px',
    }

const searchpageStyle = {
    color: "white",
    fontFamily: 'Comic Sans MS '
}
const navbarTitle = {
    color: "white",
    fontFamily: 'Comic Sans MS ',
    textDecoration: 'underline',
    fontSize: '30px'
}

const modalButtonStyle =
{
fontFamily: "Comic Sans MS",
backgroundColor: "#338ef5",
border: 'solid 1px white'
}


function createFunction() {
    return (
        <div>
        <div style={sitebarStyle}>
            <Navbar color="faded" light expand="md">
            <NavbarBrand href="/"><blockquote className= 'speech-bubble'>Comix!</blockquote></NavbarBrand>
            <Button className="splash-modal-button" style={modalButtonStyle} onClick={toggle}>Create Your Shelf</Button>
            <Modal className="splash-modal-content" isOpen={modal} toggle={toggle} className={className}>
            <ModalHeader className="splash-modal-header" toggle={toggle} close={closeBtn}>
                <h2 className="modal-title">Utility Belt</h2>
            </ModalHeader>
            <ModalBody className="splash-modal-body" style={modalStyle}>
                <Auth  updateToken={props.updateToken} toggle={toggle}/>
            </ModalBody>
            <ModalFooter className="splash-modal-footer">
            </ModalFooter>
            </Modal>
                <NavbarToggler onClick={toggleNav}/>
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                    <NavItem>
                        <Link style={searchpageStyle} to="/searchpage"> Comic Search Page</Link>       
                        <Switch>
                            <Route path="/searchpage"><SearchPage/></Route> 
                        </Switch>
                    </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    </div>
    )
}

const closeBtn = <button className="close" onClick={toggle}>&times;</button>;



=======
>>>>>>> a341c336ccc6b365385ea91a85f3ea0a6e8fce15

//STYLE

const splashpageStyle = 
{
    fontFamily: "Comic Sans"
}

<<<<<<< HEAD
const modalStyleHeader =
{
    backgroundColor: "#DE3E35",
    fontFamily: "Comic Sans"
}

const modalBodyStyle =
{
    backgroundColor: "#FFE659",
    
}

const modalTextHeaderStyle =
{
    color: "#FFE659",
    fontFamily: "Comic Sans"

}
    const footerStyle = {
        backgroundColor: '#338ef5'
    }



return (


    <div>
    <div >
        {(!localStorage.getItem('token')) ? createFunction() : <></>}
        <div className="randomcomic"> 
            {(!localStorage.getItem('token')) ? <RandomComic setAuthModal={setModal}/> : null}
        </div>
    </div>
        <Footer/>
</div>

=======
return (
    <div >          
            {(!localStorage.getItem('token')) 
            ? <RandomComic setAuthModal={props.setModal}/> 
            : <ShelfIndex  token={props.token}/>}
    </div>
>>>>>>> a341c336ccc6b365385ea91a85f3ea0a6e8fce15
);
}

export default SplashPage;