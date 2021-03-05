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
        backgroundImage: 'radial-gradient(circle, lightblue, deepskyblue)',
            border: 'solid 4px',
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
        backgroundColor: "white",
        color:'black',
        border: 'solid 2px black',

    }
    const searchpageStyle =
    {
        backgroundColor: "white",
        color:'black',
        border: 'solid 2px black',

    }
    
    const searchLinkStyle =
    {
        color: 'black',
    }

    const homeLinkStyle=
    {
        color: 'black'
    }

    return (
        <div style={sitebarStyle}>
            <Navbar  color="faded" light expand="md">
                <NavbarToggler onClick={toggle}/>
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar style={navigationStyle}>
                        <div style={{width: "75%", display:"flex", flexDirection:"row", justifyContent:"space-around", color: 'black' }}> 
                        <NavItem>
                            <Button className="top-left2" style={searchpageStyle}><Link style={searchLinkStyle} to="/searchpage">Search for a Comic</Link></Button>
                        </NavItem> 
                        <NavItem>   
                            <blockquote className="speech-bubble"><Link style={homeLinkStyle} to="/">Comix!</Link></blockquote>
                        </NavItem>
                        </div>
                    <div className="panel">
                            {localStorage.getItem('token')
                            ?  <Button className="bottom-right"
                                onClick={props.clickLogout} 
                                style={sitebarButtonStyle}>
                                    Logout
                                </Button>
                            : <Button className="bottom-right" 
                                onClick={props.toggleCreateShelf} 
                                style={sitebarButtonStyle}>
                                Create Your Shelf
                            </Button>
                            }
                    </div>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>

    )
}

export default Sitebar;