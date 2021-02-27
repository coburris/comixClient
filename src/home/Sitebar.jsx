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

    function createFunction() {
        return (
            <div>
                
                
    
            </div>
        )
    }

    const sitebarStyle = {
            backgroundColor: '#fc1621'
        }

    

    return (
        <div style={sitebarStyle}>
            <Navbar color="faded" light expand="md">
                <NavbarBrand href="/">Home</NavbarBrand>
                <NavbarToggler onClick={toggle}/>
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>   
                            <Link to="/searchpage">Search Page</Link>
                        </NavItem>
                        <NavItem>
                            <Button onClick={props.clickLogout}>Logout</Button>
                        </NavItem>
                        <NavItem>
                        <Button className="splash-modal-button" onClick={props.toggleCreateShelf}>Create Your Shelf</Button>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>

    )
}

export default Sitebar;