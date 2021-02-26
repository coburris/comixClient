import React, {useEffect, useState} from 'react';
import {Container, Row, Col, ButtonToggle} from 'reactstrap';
import './App.css';
import Auth from './auth/Auth';
import Sitebar from './home/Sitebar'
import ShelfIndex from './shelf/ShelfIndex';
import Header from './home/Header'
import Footer from './home/Footer';
import SplashPage from './home/SplashPage';
import RandomComic from './shelf/RandomComic';
import ScrollUpButton from "react-scroll-up-button";



// import SearchPage from './search/SearchPage';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';



function App(props) {
  const [sessionToken, setSessionToken] = useState('');
  const [user, setUser] = useState();
  
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
    ? <><ShelfIndex user={user} token={sessionToken}/> <p>{user}</p> </> :  null )

  }


//     return (
//     sessionToken === localStorage.getItem('token') 
//     ? 
//       <ShelfIndex token={sessionToken}/>
//     : 
//       <Row>
//         <Col md="6">
//           <RandomComic token={sessionToken}/>
//         </Col>
//         <Col md="6">
//           <Auth updateToken={updateToken}/>
//         </Col>
//       </Row>
//     )
  

  return (
    <Container>
      <Header />
      <Row>
        <Col>
        <Router>
          <Sitebar clickLogout={clearToken}/>
          <SplashPage updateToken={updateToken} setUser={setUser}/> 
        </Router>
        </Col>
      </Row>
      <Row>
        <Col md="6">
          {(localStorage.getItem('token')) ? protectedViews() : <RandomComic token={sessionToken}/>}
        </Col>
      </Row>
      <Footer />
      <ScrollUpButton/>
    </Container>
  );
  }



export default App;
