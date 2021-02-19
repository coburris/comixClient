import React, {useEffect, useState} from 'react';
import {Container, Row, Col} from 'reactstrap';
import './App.css';
import Auth from './auth/Auth';
import Sitebar from './home/Sitebar';
import ShelfIndex from './shelf/ShelfIndex';
import RandomComic from './shelf/RandomComic';


function App() {
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
    return (
    sessionToken === localStorage.getItem('token') 
    ? 
      <ShelfIndex token={sessionToken}/>
    : 
      <Row>
        <Col md="6">
          <RandomComic token={sessionToken}/>
        </Col>
        <Col md="6">
          <Auth updateToken={updateToken}/>
        </Col>
      </Row>
    )
  }

  return (
    <Container>
      <Row>
        <Col>
          <Sitebar clickLogout={clearToken}/>
        </Col>
      </Row>
        {protectedViews()}
    </Container>  
  );
}


export default App;
