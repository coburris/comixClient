import React, {useEffect, useState} from 'react';
import {Container, Row, Col, ButtonToggle} from 'reactstrap';
import './App.css';
import ShelfIndex from './shelf/ShelfIndex';
import SplashPage from './home/SplashPage';
import ScrollUpButton from "react-scroll-up-button";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';



function App(props) {
  const [sessionToken, setSessionToken] = useState('');
  
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
    localStorage.clear();
    setSessionToken('');
  }

  const protectedViews = () => {
    return (sessionToken === localStorage.getItem('token') 
    ? <ShelfIndex clickLogout={clearToken} token={sessionToken}/>  :  null )

  }

  

  return (
    <Container>
      <Row>
        <Col>
        <Router>
          <SplashPage updateToken={updateToken}/> 
        </Router>
        </Col>
      </Row>
      <Row>
        <Col>
          {(localStorage.getItem('token')) ? protectedViews() : <></>}
        </Col>
      </Row>
      <ScrollUpButton style={scrollButtonStyle} />
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
