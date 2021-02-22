import React, {useEffect, useState} from 'react';
import {Container, Row, Col, ButtonToggle} from 'reactstrap';
import './App.css';
import Auth from './auth/Auth';
import Sitebar from './home/Sitebar';
import ShelfIndex from './shelf/ShelfIndex';
import RandomComic from './shelf/RandomComic';
import Header from './home/Header'
import Footer from './home/Footer';


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
    return (sessionToken === localStorage.getItem('token') 
    ? <div>
        <ShelfIndex token={sessionToken}/>
      </div>
    :  <Auth updateToken={updateToken}/>)
  }

  return (
    <Container>
      <Header />
      <Row>
        <Col>
          <Sitebar clickLogout={clearToken}/>
        </Col>
      </Row>
      <Row>
        <Col md="6">
          <RandomComic token={sessionToken}/>
        </Col>
        <Col md="6">
          {/* <Auth updateToken={updateToken}/> */}
          {protectedViews()}
        </Col>
      </Row>
      <Footer />
    </Container>
      
      
      
      
    
  );
}


export default App;
