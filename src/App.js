import React, {useEffect, useState} from 'react';
import {
  Container, 
  Row, 
  Col, 
  ButtonToggle,     
  Modal,
  ModalHeader, 
  ModalBody, 
  ModalFooter } from 'reactstrap';
import './App.css';
<<<<<<< HEAD
=======
import Auth from './auth/Auth';
>>>>>>> a341c336ccc6b365385ea91a85f3ea0a6e8fce15
import ShelfIndex from './shelf/ShelfIndex';
import SplashPage from './home/SplashPage';
import ScrollUpButton from "react-scroll-up-button";
import Sitebar from './home/Sitebar'
import SearchPage from './search/SearchPage'

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';



function App(props) {
  const [sessionToken, setSessionToken] = useState('');
  const [modal, setModal] = useState(false);
  
  useEffect(() => {
    if(localStorage.getItem('token')){
      setSessionToken(localStorage.getItem('token'));
    }
  }, [])
  
  const updateToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
    console.log(sessionToken);
  };

  const clearToken = () => {
    localStorage.removeItem('token');
    setSessionToken('');
  }

<<<<<<< HEAD
  const protectedViews = () => {
    return (sessionToken === localStorage.getItem('token') 
    ? <ShelfIndex clickLogout={clearToken} token={sessionToken}/>  :  null )

  }

=======
  const toggleCreateShelf = () => 

  {
      console.log("Trigger toggle")
      setModal(!modal);

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
    const modalStyle =
        {
            width: "498px",
            
        }

  const closeBtn = <button className="close" onClick={toggleCreateShelf}>&times;</button>;
>>>>>>> a341c336ccc6b365385ea91a85f3ea0a6e8fce15
  

  return (
    <Container>
      <Row>
        <Col>
        <Router>
<<<<<<< HEAD
          <SplashPage updateToken={updateToken}/> 
=======
          <Sitebar clickLogout={clearToken} toggleCreateShelf={toggleCreateShelf}/>
          <Switch>
            <SplashPage exact path='/'setModal={setModal} token={sessionToken}/>
            <Route path="/searchpage"><SearchPage setModal={setModal} token={sessionToken}/></Route> 
          </Switch>
>>>>>>> a341c336ccc6b365385ea91a85f3ea0a6e8fce15
        </Router>
        </Col>
      </Row>
      <Row>
        <Col>
          {/* {(localStorage.getItem('token')) ? protectedViews() : <></>} */}
        </Col>
      </Row>
<<<<<<< HEAD
      <ScrollUpButton style={scrollButtonStyle} />
=======
      <Footer />
      <ScrollUpButton />

      <Modal className="splash-modal-content" isOpen={modal} toggle={toggleCreateShelf}>
        <ModalHeader className="splash-modal-header" toggle={toggleCreateShelf} close={closeBtn}>
            <h2 className="modal-title">Utility Belt</h2>
        </ModalHeader>
        <ModalBody className="splash-modal-body" style={modalStyle}>
            <Auth  updateToken={updateToken} toggle={toggleCreateShelf}/>
        </ModalBody>
        <ModalFooter className="splash-modal-footer">
                
        </ModalFooter>
      </Modal>
>>>>>>> a341c336ccc6b365385ea91a85f3ea0a6e8fce15
    </Container>
  );
  }



const scrollButtonStyle=
{
  backgroundColor:'black',
  border: 'solid 3px #015f40 ',
  borderRadius: '10px'
}




export default App;
