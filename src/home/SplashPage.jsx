import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Auth from '../auth/Auth';
import RandomComic from '../shelf/RandomComic';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch, 
    useHistory
} from 'react-router-dom';
import SearchPage from '../search/SearchPage';

import Sitebar from './Sitebar'
import {
    Collapse,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    Nav, 
    Row
} from 'reactstrap';
import Footer from './Footer'



//FUNCTIONS
const SplashPage = (props) => {
const {
    buttonLabel,
    className
} = props;

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
        backgroundColor: '#fc1621'
    }



function createFunction() {
    return (
        <div>
        <div style={sitebarStyle}>
            <Navbar color="faded" light expand="md">
                <NavbarBrand href="/">Home</NavbarBrand>
            <Button className="splash-modal-button" onClick={toggle}>Create Your Shelf</Button>
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
                            <Button onClick={props.clickLogout}>Logout</Button>
                        </NavItem>
                    </Nav>
                </Collapse>
            <div className="comic-quote"></div>
            </Navbar>
        </div>
    </div>
    )
}

const closeBtn = <button className="close" onClick={toggle}>&times;</button>;




//STYLE

const splashpageStyle = 
{
    fontFamily: "Comic Sans"
}

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
        <div className="searchlink"> 
            <p><Link to="/searchpage">Search Page</Link></p>        
            <Switch>
                <Route path="/searchpage" /*component={SearchPage}*/><SearchPage/></Route> 
            </Switch>
            {/* CHANGED HERE */}
            {(!localStorage.getItem('token')) ? <RandomComic setAuthModal={setModal}/> : null}
        </div>
    </div>
        <Footer/>
</div>

);
}

export default SplashPage;