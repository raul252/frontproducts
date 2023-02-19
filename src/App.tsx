import React from 'react';
import { Router } from './routers/Router';
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";     
    
//core
import "primereact/resources/primereact.min.css";

//icons
import "primeicons/primeicons.css";    
import './App.css';

function App() {

  return (
    <>
    <BrowserRouter>
      <Router></Router>
    </BrowserRouter>
    </>
  );
}

export default App;