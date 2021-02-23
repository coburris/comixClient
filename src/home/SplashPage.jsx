import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Auth from '../auth/Auth';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from 'react-router-dom';
import SearchPage from '../search/SearchPage';

const SplashPage = (props) => {
const {
    buttonLabel,
    className
} = props;

const [modal, setModal] = useState(false);

const toggle = () => setModal(!modal);

const closeBtn = <button className="close" onClick={toggle}>&times;</button>;

return (
    <div >
        <div>
    <Button className onClick={toggle}>Create Your Shelf</Button>
    <Modal isOpen={modal} toggle={toggle} className={className}>
    <ModalHeader toggle={toggle} close={closeBtn}>Utility Belt</ModalHeader>
    <ModalBody>
        <Auth updateToken={props.updateToken} />
    </ModalBody>
    <ModalFooter>
        <Button color="secondary" onClick={toggle}>Close Utility Belt</Button>
    </ModalFooter>
    </Modal>
        </div>
        <div className="searchlink"> 
            <p><Link to="/searchpage">Search Page</Link></p>
                        
                        <Switch>
                            <Route path="/searchpage" /*component={SearchPage}*/><SearchPage/></Route> 
                        </Switch>
        

        </div>
    </div>

);
}

export default SplashPage;