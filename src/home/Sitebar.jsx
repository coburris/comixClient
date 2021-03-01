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
            border: 'solid #FFEB00',
            borderRadius: '10px',
            fontFamily: 'Comic Sans MS',
    }


    const navigationStyle = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between",
        width:"100%",
        color: 'white',
    }

    const sitebarButtonStyle = {
        backgroundColor: "#338ef5",
        border: 'solid 2px #FFEB00',
        width: "100%",
        marginLeft: '-53%',
        justifyContent: "space-around"

    }
    const searchpageStyle =
    {
        color: 'white',
        backgroundColor: "#338ef5",
        border: 'solid 2px #FFEB00'

    }
    
    const searchLinkStyle =
    {
        color: 'white',
    }

    return (
        <div style={sitebarStyle}>
            <Navbar  color="faded" light expand="md">
                <NavbarToggler onClick={toggle}/>
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar style={navigationStyle}>
                        <div style={{width: "72%", display:"flex", flexDirection:"row", justifyContent:"space-around", color: 'white' }}>
                        <NavItem>   
                            <Button style={searchpageStyle}><Link style={searchLinkStyle} to="/searchpage">Search Page</Link></Button>
                        </NavItem>
                        <NavItem>   
                            <blockquote className="speech-bubble"><Link to="/">Comix!</Link></blockquote>
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