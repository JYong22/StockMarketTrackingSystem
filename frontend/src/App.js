import './App.css';
import * as React from 'react';
import axios from 'axios';
import { useEffect,useState } from 'react';

import Header from './components/Header/Header';
import Portfolio from './components/Portfolio/portfolio';
import LoginPage from './components/Login/LoginPage';


import {Routes, Route} from 'react-router-dom';
import HomePage from './components/Homepage';


function App() {

  const [loggedIn, setLogin] = useState('');
  const [sDisplay, setDisplay] = useState('none');

  useEffect(()=>{
    axios.get("http://localhost:3001/api/login", { withCredentials: true })
    .then(response =>{
      if (response.data.loggedIn = true){
        setLogin(response.data.user[0].username);
        setDisplay('block');
      }
      else{
        setDisplay('none');
      }
    })

  },[]);
  return (
      <div className="App">
        <Header dis = {{display: sDisplay}} name = {loggedIn}/>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="login" element={<LoginPage/>}/>
          <Route path="portfolio" element={<Portfolio/>}/>
        </Routes>
      </div>
  );
}

export default App;
