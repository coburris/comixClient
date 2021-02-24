import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Auth from '../auth/Auth';
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

const [modal, setModal] = useState(false);

const toggle = () => 

    {
        console.log("Trigger toggle")
        setModal(!modal);

    }

function createFunction() {
    return (
        <div>
            <Button onClick={toggle}>Create Your Shelf</Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
            <ModalHeader toggle={toggle} close={closeBtn}>Utility Belt</ModalHeader>
            <ModalBody>
                <Auth updateToken={props.updateToken} toggle={toggle} setUser={props.setUser}/>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={toggle}>Close Utility Belt</Button>
            </ModalFooter>
            </Modal>

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

return (


    <div>
      <div >
        {(!localStorage.getItem('token')) ? createFunction() : <></>}
        <div className="searchlink"> 
            <p><Link to="/searchpage">Search Page</Link></p>        
            <Switch>
                <Route path="/searchpage" /*component={SearchPage}*/><SearchPage/></Route> 
            </Switch>

        </div>
    </div>
</div>

);
}

export default SplashPage;