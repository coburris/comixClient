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
import Auth from './auth/Auth';
import ShelfIndex from './shelf/ShelfIndex';
import SplashPage from './home/SplashPage';
import ScrollUpButton from "react-scroll-up-button";
import Sitebar from './home/Sitebar';
import SearchPage from './search/SearchPage';
import Footer from './home/Footer';

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
  

  return (
    <Container>
      <Row>
        <Col>
        <Router>
          <Sitebar clickLogout={clearToken} toggleCreateShelf={toggleCreateShelf}/>
          <Switch>
            <SplashPage exact path='/'setModal={setModal} token={sessionToken}/>
            <Route path="/searchpage"><SearchPage setModal={setModal} token={sessionToken}/></Route> 
          </Switch>
        </Router>
        </Col>
      </Row>
      <Row>
        <Col>
          {/* {(localStorage.getItem('token')) ? protectedViews() : <></>} */}
        </Col>
      </Row>
      <Footer />
      <ScrollUpButton style={scrollButtonStyle} />
      <Modal isOpen={modal} toggle={toggleCreateShelf}>
        <ModalHeader id="splash-modal-header" toggle={toggleCreateShelf} close={closeBtn}>
            Utility Belt
        </ModalHeader>
        <ModalBody className="splash-modal-body" style={modalStyle}>
            <Auth  updateToken={updateToken} toggle={toggleCreateShelf}/>
        </ModalBody>
      </Modal>
    </Container>
  );
  }



const scrollButtonStyle=
{
  backgroundColor:'black',
  border: 'solid 3px black',
  borderRadius: '10px',
  color: 'black'
}




export default App;
