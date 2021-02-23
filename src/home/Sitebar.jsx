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
import {
BrowserRouter as Router,
Route,
Link,
Switch
} from 'react-router-dom';

const Sitebar = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        let newIsOpen = !isOpen;
        setIsOpen(newIsOpen); 
    }

    return (
        <>
            <Navbar color="faded" light expand="md">
                <NavbarBrand href="/">Home</NavbarBrand>
                <NavbarToggler onClick={toggle}/>
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                    <NavItem>

                            <Button onClick={props.clickLogout}>Logout</Button>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
            {/*<div className="link-to-search">
                
                    <p><Link to="/searchpage">Search Page</Link></p>
                
                <Switch>
                    <Route path="/searchpage"><SearchPage/></Route>
                
                </Switch>
                
            </div> */}
        </>
    )
}

export default Sitebar;