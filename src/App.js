import React, {useEffect, useState} from 'react';
import './App.css';
import Auth from './auth/Auth';
import Sitebar from './home/Sitebar';
import ShelfIndex from './shelf/ShelfIndex';


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
    return (sessionToken === localStorage.getItem('token') ? <ShelfIndex token={sessionToken}/>
    :  <Auth updateToken={updateToken}/>)
  }

  return (
    <div>
      <Sitebar clickLogout={clearToken}/>
      {/* <Auth updateToken={updateToken}/> */}
      {protectedViews()}
    </div>
  );
}


export default App;
