import React, {useState} from 'react';
import {
    Collapse,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    Nav,
    Button

} from 'reactstrap';

import SearchPage from '../search/SearchPage';
import Auth from '../auth/Auth';

import {
BrowserRouter as Router,
Route,
Link,
Switch
} from 'react-router-dom';

import SplashPage from './SplashPage';

const Sitebar = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    

    const toggle = () => {
        let newIsOpen = !isOpen;
        setIsOpen(newIsOpen); 
    }

    const sitebarStyle = {
            backgroundColor: '#fc1621',
           

    }

    const navigationStyle = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between",
        width:"100%"
    }

    const sitebarButtonStyle = {
        //fontFamily: "'Comic Sans MS', 'Comic Sans', 'cursive'"
    }

    return (
        <div style={sitebarStyle}>
            <Navbar color="faded" light expand="md">
                <NavbarToggler onClick={toggle}/>
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar style={navigationStyle}>
                        <div style={{width: "30%", display:"flex", flexDirection:"row", justifyContent:"space-around"}}>
                        <NavItem>   
                            <Link to="/">Home</Link>
                        </NavItem>
                        <NavItem>   
                            <Link to="/searchpage">Search Page</Link>
                        </NavItem>
                        </div>
                        
                        <NavItem>
                            {localStorage.getItem('token')
                            ?  <Button 
                                onClick={props.clickLogout} 
                                style={sitebarButtonStyle}>
                                    Logout
                                </Button>
                            : <Button className="splash-modal-button" 
                                onClick={props.toggleCreateShelf} 
                                style={sitebarButtonStyle}>
                                Create Your Shelf
                            </Button>
                            }
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>

    )
}

export default Sitebar;