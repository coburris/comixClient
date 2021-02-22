import React, {useEffect, useState} from 'react';
import {Container, Row, Col, Button} from 'reactstrap';
import './App.css';
import Auth from './auth/Auth';
import Sitebar from './home/SplashPage';
import ShelfIndex from './shelf/ShelfIndex';
import RandomComic from './shelf/RandomComic';
import SplashPage from './home/SplashPage';


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
    ? <ShelfIndex token={sessionToken}/> :  null )
  }

  return (
    <Container>
      <Row>
        <Col>
          <SplashPage updateToken={updateToken}/> 
          {/* <Button onClick={clearToken()}>Test</Button> */}
        </Col>
      </Row>
      <Row>
        <Col md="6">
          {/* <RandomComic token={sessionToken}/> */}
        </Col>
        <Col md="6">
          {/* <Auth updateToken={updateToken}/> */}
          {protectedViews()}
        </Col>
      </Row>
    </Container>
    
  );
}


export default App;
